export const strings: { [key: string]: string } = {
  // Sign in and Sign up
  SIGN_IN_TEXT: "Sign in",
  SIGN_UP_TEXT: "Sign up",

  USERNAME_PLACEHOLDER: "Username",
  EMAIL_PLACEHOLDER: "Email",
  PASSWORD_PLACEHOLDER: "Password",

  LOADING_TEXT: "Loading...",

  NOT_HAVE_ACCOUNT_TEXT: "Do not have an account?",
  HAVE_AN_ACCOUNT: "Have an account?",

  SOMETHING_WENT_WRONG_ERROR: "Something went wrong!",
  UNKNOWN_ERROR_TEXT: "An unknown error occurred",

  // About
  ABOUT_HEADER: "Task: Online Practise Test Platform and Enhanced Testing.",
  ABOUT_DESCRIPTION:
    "Implement a login and signup system with a personalized dashboard and an adaptive online quiz platform for students in grades 7 - 10.",
  REQUIREMENTS_TEXT: "Requirements:",
  REQUIREMENTS_DESCRIPTION:
    "The front-end of the application is built with React and uses React Router for client-side routing. The back-end is built with Node.js and Express, and uses MongoDB as the database. Authentication is implemented using JSON Web Tokens (JWT).",
  ONE_USER_AUTH_TEXT: "User authentication:",
  FEATURE_ONE: "Implement a login system with email and password.",
  FEATURE_TWO: "Include Google OAuth for login.",
  FEATURE_THREE: "Provide a signup option.",
  TWO_DASHBOARD: "Dashboard:",
  FEATURE_FOUR:
    "Upon successful login, direct users to a personalized dashboard.",
  FEATURE_FIVE: "The dashboard should allow users to start an online quiz.",
  THREE_QUIZ_SYSTEM: "Quiz System:",
  FEATURE_SIX:
    "Include 20 MCQ questions with varying initial weights based on difficulty.",
  FEATURE_SEVEN:
    "Tag each question with relevant topics (e.g., algebra, geometry).",
  FEATURE_EIGHT:
    "Implement Computerized Adaptive Testing (CAT) to adapt quiz difficulty based on user performance.",
  FOUR_RESULT: "Result Evaluation and Reporting:",
  FEATURE_NINE:
    "Generate a report evaluating the user's performance upon quiz submission.",
  FEATURE_TEN: "Provide improvement suggestions.",
  FIVE_TEST_COVERAGE: "Testing and Coverage Requirements:",
  FEATURE_ELEVEN:
    "Test Cases: Implement comprehensive test cases for the following:",
  ELEVEN_ONE: "Authentication: (successful and failed login/signup scenarios)",
  ELEVEN_TWO: "Dashboard rendering and user redirection.",
  ELEVEN_THREE: "Quiz adaptation logic based on user responses.",
  ELEVEN_FOUR: "Result evaluation and report generation.",
  FEATURE_TWELVE:
    "Coverage: Aim for at least 90% code coverage, ensuring crucial components are thoroughly tested.",

  //HOME
  HOME_HEADER: "Welcome to EduChamp Quiz Application!",
  HOME_ONE: "If you are in 7 - 10 grade and want to increase your knowledge.",
  HOME_TWO:
    "So, here is the platform through which you can take quiz and test your knowledge. Our platform is developed by remembering a point in mind that you will not waste your time in particular set of questions.",
  HOME_THREE:
    "Rather if you are able to solve a particular difficulty of question then on every further step you need to put an extra concept to solve the question. By which you saves your time and energy and put that to understand many other concepts.",
  START_QUIZ_BUTTON: "Start Quiz",

  //PROFILE
  ERROR_UPLOADING_IMAGE:
    "Error uploading image (file size must be less than 2 MB)",
  UPLOADING_TEXT: "Uploading:",
  IMAGE_UPLOAD_SUCCESS: "Image uploaded successfully",
  PROFILE_TEXT: "Profile",
  UPDATE_TEXT: "Update",
  DELETE_ACCOUNT_TEXT: "Delete Account",
  SIGN_OUT_TEXT: "Sign out",
  USER_UPDATE_SUCCESS: "User is updated successfully!",

  //HEADER COMPONENT
  HEADER_HEAD: "EduChamp Quiz App",
  HOME_LINK: "Home",
  ABOUT_LINK: "About",

  // OAUTH COMPONENT
  GOOGLE_LOGIN_DATA_ERROR:
    "Google sign-in did not return all required user data.",
  GOOGLE_LOGIN_ERROR: "Could not login with Google",
  CONTINUE_WITH_GOOGLE: "Continue with Google",
};
