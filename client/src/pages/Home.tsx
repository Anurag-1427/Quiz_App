import React from "react";

const Home: React.FC = () => {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto flex flex-col">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">
        Welcome to EduChamp Quiz Application!
      </h1>
      <p className="mb-4 text-slate-700">
        If you are in 7 - 10 grade and want to increase your knowledge.
      </p>
      <p className="mb-4 text-slate-700">
        So, here is the platform on which you can take quiz and test your
        knowledge. Our platform is developed by taking a point in mind that you
        can not waste your time in particular set of questions.
      </p>
      <p className="mb-4 text-slate-700">
        Rather if you are able to solve a particular difficulty of question then
        on every further step you need to put an extra concept to solve the
        question. By which you saves your time and energy and put that to
        understand many other concepts.
      </p>
      <button className="mt-4 bg-blue-600 text-white p-2 rounded max-w-32 mx-auto">
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
