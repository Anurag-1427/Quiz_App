import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { assets } from "../assets";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data?.success === false) {
        setError(true);
        return;
      }
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">{assets.localized_strings["SIGN_UP_TEXT"]}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder={assets.localized_strings["USERNAME_PLACEHOLDER"]}
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder={assets.localized_strings["EMAIL_PLACEHOLDER"]}
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder={assets.localized_strings["PASSWORD_PLACEHOLDER"]}
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? assets.localized_strings["LOADING_TEXT"] : assets.localized_strings["SIGN_UP_TEXT"]}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>{assets.localized_strings["HAVE_AN_ACCOUNT"]}</p>
        <Link to="/">
          <span className="text-blue-500">{assets.localized_strings["SIGN_IN_TEXT"]}</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && assets.localized_strings["SOMETHING_WENT_WRONG_ERROR"]}</p>
    </div>
  );
};

export default SignUp;
