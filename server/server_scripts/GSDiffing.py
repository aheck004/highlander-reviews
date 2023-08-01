# when dokcerizing remember to install python and its dependancies
# for this script
from pymongo import MongoClient  # pip3 install pymongo
import gspread  # pip3 install gspread
from oauth2client.service_account import ServiceAccountCredentials
# pip3 install oath2client
import csv
import json
import os


def download_new_sheet():
    scope = ['https://spreadsheets.google.com/feeds',
             'https://www.googleapis.com/auth/drive']
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
            './credentials.json', scope)
    client = gspread.authorize(credentials)

    spreadsheet = client.open_by_url(
            'https://docs.google.com/spreadsheets/d/\
                    1qiy_Oi8aFiPmL4QSTR3zHe74kmvc6e_159L1mAUUlU0/edit#gid=0')

    worksheet = spreadsheet.worksheet('Sheet1')

    data = worksheet.get_all_values()

    tsv_file_path = './new.tsv'

    with open(tsv_file_path, 'w', newline='') as tsv_file:
        tsv_writer = csv.writer(tsv_file, delimiter='\t')
        tsv_writer.writerows(data)
    print("Downloaded new.tsv from UCR Class Difficulty Spreadsheet")


def compare_files():
    old_sheet_path = './old.tsv'
    new_sheet_path = './new.tsv'

    client = MongoClient(URI)
    db = client['UCR']
    collection = db['reviews']
    try:
        with open(old_sheet_path, 'r') as old_sheet, open(new_sheet_path, 'r')\
                as new_sheet:
            old_lines = [line.rstrip('\n') for line in old_sheet.readlines()]
            new_lines = [line.rstrip('\n') for line in new_sheet.readlines()]
            i = 0
            j = 0
            current_course = 'START'
            # find the difference between the old and new file
            while i < len(old_lines) and j < len(new_lines):
                new_line_data = new_lines[j].split('\t')
                if new_line_data[0] != '':
                    current_course = new_line_data[0]
                if (old_lines[i] != new_lines[j]):
                    new_review = {"class_name": current_course,
                                  "additional_comments": new_line_data[2],
                                  "difficulty": new_line_data[3],
                                  "date": new_line_data[4],
                                  "like": 0,
                                  "dislike": 0
                                  }
                    result = collection.insert_one(new_review)
                    print("new review found:", result)
                    j += 1
                else:
                    j += 1
                    i += 1
            # everything else is new by the pidgeonhole principle
            for new_line in new_lines[j:]:
                new_line_data = new_line.split('\t')
                new_review = {"class_name": current_course,
                              "additional_comments": new_line_data[2],
                              "difficulty": new_line_data[3],
                              "date": new_line_data[4],
                              "like": 0,
                              "dislike": 0
                              }
                result = collection.insert_one(new_sheet)
                print("new review found:", result)

    except FileNotFoundError as error:
        print("File not found.", error)
    except IOError as error:
        print("An error occurred while reading the file.", error)

    print("No more new reviews")

    os.remove('./old.tsv')
    print("deleted old.tsv")
    os.rename('./new.tsv', 'old.tsv')
    print("renamed new.tsv to old.tsv")


if __name__ == "__main__":
    with open("./config.json") as config_file:
        config = json.load(config_file)
    URI = config["URI"]
    download_new_sheet()
    compare_files()
    print("Script has finished succesfully")
