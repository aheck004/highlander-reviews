# Purpose: Rebuilds the MongoDB databases from the Google Sheets spreadsheet
# This script relies on the Google Sheets API and the MongoDB API:
# This script is meant to be run on a local machine, not on the server
# This script is meant to be run once, when the database is first created
# And only after the courses collection has been created
# To create the courses collection from scratch
# run the cURL_UCR_Course_Catalog.py script


from pymongo import MongoClient  # pip3 install pymongo
import gspread  # pip3 install gspread
from oauth2client.service_account import ServiceAccountCredentials
import json
from typing import TypedDict
from datetime import datetime
from tqdm import tqdm

class ReviewModel(TypedDict):
    class_name: str
    additional_comments: str
    difficulty: int
    date: str
    like: int
    dislike: int


class CourseModel(TypedDict):
    average_diff: float
    number_of_reviews: int


with open("./config.json") as config_file:
    config = json.load(config_file)

URI = config["URI"]

client = MongoClient(URI)
db = client['UCR']
reviews_collection = db['reviews']
courses_collection = db['courses']

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
credentials = ServiceAccountCredentials.from_json_keyfile_name(
        './credentials.json', scope)
client = gspread.authorize(credentials)
print("Connecting to Google Sheets")
spreadsheet = client.open_by_url(
        'https://docs.google.com/spreadsheets/d/1qiy_Oi8aFiPmL4QSTR3zHe74kmvc6e_159L1mAUUlU0/edit#gid=0')

worksheet = spreadsheet.worksheet('Sheet1')
print("Downloading Reviews from Google Sheets")
data = worksheet.get_all_values()

current_course = data[2][0]
current_course_review_count = 1
current_course_average_diff = float(data[2][1])

with tqdm(total=len(data[2:]), desc="Uploading Reviews to MongoDB", unit="Reviews") as pbar:
    for row in data[2:]:
        if row[3] == "" or row[4] == "":
            pbar.update()# if review doesn't have a difficulty rating or date, skip it
            continue
        elif row[0] != "":  # if new course
            # insert current_course (now previous course) into database
            courses_collection.update_one(
                    {"course": current_course},
                    {"$set": {"average_diff": current_course_average_diff, "number_of_reviews": current_course_review_count}})
            # reset current courses variables
            current_course = row[0]
            current_course_review_count = 1
            current_course_average_diff = float(row[1])
        else:  # if same course
            current_course_review_count += 1
        review = ReviewModel(class_name=current_course,
                             additional_comments=row[2],
                             difficulty=int(row[3]),
                             date=(lambda date_str: datetime.strptime(date_str, '%m/%d/%Y').strftime('%Y/%m/%d'))(row[4].replace('l', '/').replace('-', '/')),
                             like=0,
                             dislike=0)
        reviews_collection.insert_one(review)
        pbar.update()
print("Done uploading reviews to MongoDB")
