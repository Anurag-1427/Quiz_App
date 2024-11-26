import React from "react";
import { assets } from "../assets";

const About: React.FC = () => {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        {assets.localized_strings["ABOUT_HEADER"]}
      </h1>
      <p className="mb-4 text-slate-700">
        {assets.localized_strings["ABOUT_DESCRIPTION"]}
      </p>
      <h1 className="text-3xl font-bold mb-4 text-slate-800">{assets.localized_strings["REQUIREMENTS_TEXT"]}</h1>
      <p className="mb-4 text-slate-700">
        {assets.localized_strings["REQUIREMENTS_DESCRIPTION"]}
      </p>
      <ol className="list-decimal pl-4">
        <li className="font-bold text-slate-800">{assets.localized_strings["ONE_USER_AUTH_TEXT"]}</li>
        <ul className="list-disc pl-10">
          <li className="text-slate-700">
            {assets.localized_strings["FEATURE_ONE"]}
          </li>
          <li className="text-slate-700">{assets.localized_strings["FEATURE_TWO"]}</li>
          <li className="text-slate-700">{assets.localized_strings["FEATURE_THREE"]}</li>
        </ul>
        <li className="font-bold text-slate-800 pt-4">{assets.localized_strings["TWO_DASHBOARD"]}</li>
        <ul className="list-disc pl-10">
          <li className="text-slate-700">
            {assets.localized_strings["FEATURE_FOUR"]}
          </li>
          <li className="text-slate-700">
            {assets.localized_strings["FEATURE_FIVE"]}
          </li>
        </ul>
        <li className="font-bold text-slate-800 pt-4">{assets.localized_strings["THREE_QUIZ_SYSTEM"]}</li>
        <ul className="list-disc pl-10">
          <li className="text-slate-700">
            {assets.localized_strings["FEATURE_SIX"]}
          </li>
          <li className="text-slate-700">
            {assets.localized_strings["FEATURE_SEVEN"]}
          </li>
          <li className="text-slate-700">
            {assets.localized_strings["FEATURE_EIGHT"]}
          </li>
        </ul>
        <li className="font-bold text-slate-800 pt-4">
          {assets.localized_strings["FOUR_RESULT"]}
        </li>
        <ul className="list-disc pl-10">
          <li className="text-slate-700">
            {assets.localized_strings["FEATURE_NINE"]}
          </li>
          <li className="text-slate-700">{assets.localized_strings["FEATURE_TEN"]}</li>
        </ul>
        <li className="font-bold text-slate-800 pt-4">
          {assets.localized_strings["FIVE_TEST_COVERAGE"]}
        </li>
        <ol className="list-decimal pl-10">
          <li className="text-slate-700">
            {assets.localized_strings["FEATURE_ELEVEN"]}
            <ul className="list-disc pl-10">
              <li className="text-slate-700">
                {assets.localized_strings["ELEVEN_ONE"]}
              </li>
              <li className="text-slate-700">
                {assets.localized_strings["ELEVEN_TWO"]}
              </li>
              <li className="text-slate-700">
                {assets.localized_strings["ELEVEN_THREE"]}
              </li>
              <li className="text-slate-700">
                {assets.localized_strings["ELEVEN_FOUR"]}
              </li>
            </ul>
          </li>
          <li className="text-slate-700">
            {assets.localized_strings["FEATURE_TWELVE"]}
          </li>
        </ol>
      </ol>
    </div>
  );
};

export default About;
