import requests
from pymongo import MongoClient, UpdateOne  # pip3 install pymongo
import math
from tqdm import tqdm
import json
import re

def fixCourseTitle(courseTitle):
    courseTitle = courseTitle.lower()
    courseTitle = courseTitle.capitalize()
    def capitalize_word(match):
        word = match.group()
        if word.lower() in ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x']:
            return word.upper()
        if word.lower() not in ['a', 'is', 'in', 'an', 'at', 'and', 'the', 'for', 'of', 'to', 'by']:
            return word.capitalize()
        return word
    return re.sub(r'(?<=\s)\w+\b', capitalize_word, courseTitle)


pageMaxSize = 500
JSESSIONID="5BE2A6BE006821F6FB9092ADC67E1E43"

url = 'https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/courseSearchResults/'
course_search_results_header = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Sec-Fetch-Site': 'same-origin',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Sec-Fetch-Mode': 'cors',
    'Host': 'registrationssb.ucr.edu',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
    'Referer': 'https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/courseSearch/courseSearch',
    'Connection': 'keep-alive',
    'Cookie': f'JSESSIONID={JSESSIONID}; BIGipServerp_registrationssb.ucr.edu_8443=2811498668.64288.0000',
    'Sec-Fetch-Dest': 'empty',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Synchronizer-Token': '10e3d3f3-2370-4899-aa44-2802a8f28cbb'
}

params = {
    'txt_term': '202410',
    'startDatepicker': '',
    'endDatepicker': '',
    'uniqueSessionId': 'xbtch1691017523147',
    'pageOffset': '0',
    'pageMaxSize': pageMaxSize,
    'sortColumn': 'subjectDescription',
    'sortDirection': 'asc'
}

course_data_list = []
total_entries = None

response = requests.get(url+"courseSearchResults", headers=course_search_results_header, params=params)
if response.status_code == 200:
    data = response.json()
    total_entries = data['totalCount']
    print(f"Total entries: {total_entries}")

    course_data_list.extend(data['data'])
else:
    print(f"Request failed with status code: {response.status_code}")

total_pages = math.ceil(total_entries/500)
with tqdm(total=total_pages, desc="Requesting Courses", unit="page", initial=1) as pbar:
    for page_offset in range(1, total_pages):
        params = {
            'txt_term': '202410',
            'startDatepicker': '',
            'endDatepicker': '',
            'uniqueSessionId': 'xbtch1691017523147',
            'pageOffset': page_offset*pageMaxSize,
            'pageMaxSize': '500',
            'sortColumn': 'subjectDescription',
            'sortDirection': 'asc'
        }
        response = requests.get(url, headers=course_search_results_header, params=params)
        if response.status_code == 200:
            data = response.json()
            course_data_list.extend(data['data'])
            pbar.update()
        else: 
            print(f"Request failed with status code: {response.status_code}")

with tqdm(total=len(course_data_list), desc="Requesting Descriptions", unit="request") as pbar:
    with open("./config.json") as config_file:
        config = json.load(config_file)
    client = MongoClient(config["URI"])
    db = client['UCR']
    collection = db['courses']
    for course in course_data_list:
        if '-' in course["courseNumber"] or course["courseDescription"] == "For college use only" or course["courseDescription"] == "null":
            pbar.update()
            continue
        data = requests.post(url+"getCourseDescription", data={'term': '202410', 'subjectCode': course["subjectCode"], 'courseNumber': course["courseNumber"]})
        course["courseDescription"] = data.text
        query = {'class_name': course["subjectCode"]+course["courseNumber"]}
        update_operation = {'$set': {
            "class_name": course["subjectCode"]+course["courseNumber"], 
            "subject_code": course["subjectCode"], 
            "course_number": course["courseNumber"],
            "course_title": fixCourseTitle(course["courseTitle"]),
            "course_description": course["courseDescription"].strip('\n')
        }}
        collection.update_one(query, update_operation, upsert=True)
        pbar.update()

with open("courses_data.json", 'w') as file:
    json.dump({"data": course_data_list}, file, indent=4)
