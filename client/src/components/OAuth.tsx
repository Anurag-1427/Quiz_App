import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { assets } from "../assets";

export default function OAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      if (
        !result.user.displayName ||
        !result.user.email ||
        !result.user.photoURL
      ) {
        throw new Error(
          assets.localized_strings["GOOGLE_LOGIN_DATA_ERROR"]
        );
      }

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error) {
      console.error(assets.localized_strings["GOOGLE_LOGIN_ERROR"], error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      {assets.localized_strings["CONTINUE_WITH_GOOGLE"]}
    </button>
  );
}
