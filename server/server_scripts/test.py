import re

def fixCourseTitle(courseTitle):
    courseTitle = courseTitle.lower()
    courseTitle = courseTitle.capitalize()
    def capitalize_word(match):
        word = match.group()
        if word.lower() not in ['a', 'is', 'an', 'at', 'and', 'the', 'for', 'of', 'to', 'by']:
            return word.capitalize()
        return word
    return re.sub(r'(?<=\s)\w+\b', capitalize_word, courseTitle)

print(fixCourseTitle("THIS IS A TEST FOR THE FUNCTION"))

t1 = "HELOO"

t1 = t1.lower()

print(t1)
