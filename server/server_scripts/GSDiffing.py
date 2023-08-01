#when dokcerizing remember to install python and its dependancies
#for this script
from pymongo import MongoClient
import json

def compare_files():
    old_sheet_path = './old.tsv'
    new_sheet_path = './new.tsv'

    client = MongoClient(URI)
    db = client['UCR']
    collection = db['reviews']
    # Open the file in read mode ('r')
    try:
        with open(old_sheet_path, 'r') as old_sheet, open(new_sheet_path, 'r')\
                as new_sheet:
            # Read the entire contents of the file and store it in a variable
            old_lines = [line.rstrip('\n') for line in old_sheet.readlines()]
            new_lines = [line.rstrip('\n') for line in new_sheet.readlines()]
            i = 0
            j = 0
            current_course = 'START'
            #find the difference between the old and new file
            while j < len(new_lines):
                new_line_data = new_lines[j].split('\t')
                if new_line_data[0] != '':
                    current_course = new_line_data[0]
                if (old_lines[i] != new_lines[j]): 
                    new_review = {"class_name":current_course,
                                  "additional_comments":new_line_data[2],
                                  "difficulty":new_line_data[3],
                                  "date":new_line_data[4],
                                  "like":0,
                                  "dislike":0
                                  }
                    result = collection.insert_one(new_review)
                    print(result)
                    j += 1
                else:
                    j += 1
                    i += 1
            #everything else is new by the pidgeonhole principle
            for i in range(j, len(new_lines)):
                print(current_course, new_lines[i])

    except FileNotFoundError as error:
        print("File not found.", error)
    except IOError as error:
        print("An error occurred while reading the file.", error)

    #TODO:
    #   delete old.tsv
    #   rename new.tsv to old.tsv


if __name__ == "__main__":
    with open('config.json') as config_file:
        config = json.load(config_file)
    URI = config["URI"]
    compare_files()
