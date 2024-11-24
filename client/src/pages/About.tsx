import React from "react";

const About = () => {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">
        Task: Online Practise Test Platform and Enhanced Testing.
      </h1>
      <p className="mb-4 text-slate-700">
        Implement a login and signup system with a personalized dashboard and an
        adaptive online quiz platform for students in grades 7 - 10.
      </p>
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">Requirements:</h1>
      <p className="mb-4 text-slate-700">
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Node.js and
        Express, and uses MongoDB as the database. Authentication is implemented
        using JSON Web Tokens (JWT).
      </p>
      <ol className="list-decimal pl-4">
        <li className="font-bold text-slate-800">User authentication:</li>

        <ul className="list-disc pl-10">
          <li className="text-slate-700">
            Implement a login system with email and password.
          </li>
          <li className="text-slate-700">Include Google OAuth for login.</li>
          <li className="text-slate-700">Provide a signup option.</li>
        </ul>
        <li className="font-bold text-slate-800 pt-4">Dashboard:</li>

        <ul className="list-disc pl-10">
          <li className="text-slate-700">
            Upon successful login, direct users to a personalized dashboard.
          </li>
          <li className="text-slate-700">
            The dashboard should allow users to start an online quiz.
          </li>
        </ul>
        <li className="font-bold text-slate-800 pt-4">Quiz System:</li>

        <ul className="list-disc pl-10">
          <li className="text-slate-700">
            Include 20 MCQ questions with varying initail weights based on
            difficulty.
          </li>
          <li className="text-slate-700">
            Tag each question with relevant topics (e.g., algebra, geometry).
          </li>
          <li className="text-slate-700">
            Implement Computerized Adaptive Testing (CAT) to adapt quiz
            difficulty based on user performance.
          </li>
        </ul>
        <li className="font-bold text-slate-800 pt-4">
          Result Evaluation and reporting:
        </li>

        <ul className="list-disc pl-10">
          <li className="text-slate-700">
            Generate a report evaluating the user's performance upon quiz
            submission.
          </li>
          <li className="text-slate-700">Provide improvement suggestion.</li>
        </ul>
        <li className="font-bold text-slate-800 pt-4">
          Testing and Coverage Requirements:
        </li>

        <ol className="list-decimal pl-10">
          <li className="text-slate-700">
            Test Cases: Implement comprehensive test cases for the following:
            <ul className="list-disc pl-10">
              <li className="text-slate-700">
                Authentication: (successful and failed login/signup scenarios)
              </li>
              <li className="text-slate-700">
                Dashboard rendering and user redirection.
              </li>
              <li className="text-slate-700">
                Quiz adaptation logic based on user responses.
              </li>
              <li className="text-slate-700">
                Result evaluation and report generation.
              </li>
            </ul>
          </li>
          <li className="text-slate-700">
            Coverage: Aim for at least 90% code coverage, ensuring crucial
            components are thoroughly tested.
          </li>
        </ol>
      </ol>
    </div>
  );
};

export default About;
