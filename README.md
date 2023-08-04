# Highlander Reviews - React Application

## Overview

Highlander Reviews is a web application designed to allow students from the University of California Riverside to rate and review the courses they have taken. The website aims to provide a platform where students can share their experiences with different classes, helping others make informed decisions when choosing their courses.

## Features

1. **Course Reviews**: Students can view and submit reviews for the courses they have taken. Each review includes essential information such as course name, rating, and comments.

2. **Search and Filter**: Users can search from over 6,700+ courses and filter reviews based on various criteria like course name, rating, or department.

3. **Course Statistics**: The application provides overall statistics for each course, such as the average rating and the number of reviews it has received.

4. **User Authentication**: To leave a review or access advanced features, users need to create an account and log in securely with their UCR gmail @ucr.edu.

5. **Responsive Design**: The website is designed to be responsive, ensuring a seamless experience across different devices and screen sizes.

## Data Source

The review data for the Highlander Reviews application is sourced from the UCR class difficulty database, available in a Google Sheets document. The data can be accessed using the following link: [UCR Class Difficulty Database](https://docs.google.com/spreadsheets/d/1qiy_Oi8aFiPmL4QSTR3zHe74kmvc6e_159L1mAUUlU0/edit#gid=0).

The data in the spreadsheet includes the following columns:
- Course Name
- Rating (numeric, ranging from 1 to 10)
- Comments
- Date

The list of courses available for users to review was gathered from the [UCR Course Catalog](https://registrationssb.ucr.edu/StudentRegistrationSsb/ssb/registration/registration). from the Term: Winter 2024. 

The data gathered from the course catalog includes more than 6,700 courses each along with:
- Course Name
- Course Number
- Course Title
- Course Description
- Subject Code

## Technology Stack

The Highlander Reviews application is built using the following technology stack:

- **Front-end Framework**: React.js is used as the front-end framework to create a dynamic and interactive user interface.

- **State Management**: React's Context API will be employed to manage the application's state, including user authentication and course reviews.

- **User Authentication**: For user authentication, the application uses Google OAuth 2.0, providing a secure and trusted login process.

- **Backend**: A server-side application will be built using Node.js with Express.js to handle user authentication, review submissions, and data retrieval from MongoDB and Google Authentication API.

- **Database**: The review data will be stored in a relational or NoSQL database, such as MongoDB.

- **Styling**: The application will be styled using CSS or a CSS preprocessor like Sass to achieve a visually appealing and user-friendly interface.

- **Deployment**: The application will be deployed on a cloud platform like AWS, Heroku, or Vercel for public access.

## Project Setup

To set up the Highlander Reviews application locally, follow these steps:

1. Clone the repository from GitHub: `git clone <repository-url>`
2. Install the necessary dependencies: `npm install`
3. Configure the environment variables for the database connection and Google Sheets API credentials.
4. Run the development server: `npm start`
5. Access the application in your browser at `http://localhost:3000`.

## Conclusion

Highlander Reviews aims to empower UC Riverside students with valuable insights into courses and instructors based on peer reviews. By providing a user-friendly and informative platform, students can make well-informed decisions about their academic journey. GO HIGHLANDERS!
