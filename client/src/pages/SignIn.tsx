import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { assets } from "../assets";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`/api/auth/signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error: unknown) {
      dispatch(
        signInFailure(
          error instanceof Error ? error.message : assets.localized_strings["UNKNOWN_ERROR_TEXT"]
        )
      );
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">{assets.localized_strings["SIGN_IN_TEXT"]}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder={assets.localized_strings["EMAIL_PLACEHOLDER"]}
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder={assets.localized_strings["PASSWORD_PLACEHOLDER"]}
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? assets.localized_strings["LOADING_TEXT"] : assets.localized_strings["SIGN_IN_TEXT"]}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>{assets.localized_strings["NOT_HAVE_ACCOUNT_TEXT"]}</p>
        <Link to="/sign-up">
          <span className="text-blue-500">{assets.localized_strings["SIGN_UP_TEXT"]}</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || assets.localized_strings["SOMETHING_WENT_WRONG_ERROR"] : ""}
      </p>
    </div>
  );
};

export default SignIn;
