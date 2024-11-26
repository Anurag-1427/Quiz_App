import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets";

const Home: React.FC = () => {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto flex flex-col">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">
        {assets.localized_strings["HOME_HEADER"]}
      </h1>
      <p className="mb-4 text-slate-700">
        {assets.localized_strings["HOME_ONE"]}
      </p>
      <p className="mb-4 text-slate-700">
        {assets.localized_strings["HOME_TWO"]}
      </p>
      <p className="mb-4 text-slate-700">
        {assets.localized_strings["HOME_THREE"]}
      </p>
      <Link to='/quiz' className="mt-4 bg-blue-600 text-white p-2 rounded max-w-32 mx-auto">
        {assets.localized_strings["START_QUIZ_BUTTON"]}
      </Link>
    </div>
  );
};

export default Home;
