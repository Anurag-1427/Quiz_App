import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { assets } from "../assets";

interface CurrentUser {
  profilePicture: string;
}

export default function Header() {
  const { currentUser } = useSelector((state: RootState) => state.user) as {
    currentUser: CurrentUser | null;
  };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/home">
          <h1 className="font-bold">{assets.localized_strings["HEADER_HEAD"]}</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/home">
            {currentUser ? (
              <li>{assets.localized_strings["HOME_LINK"]}</li>
            ) : (
              <></>
            )}

          </Link>
          <Link to="/about">
            <li>{assets.localized_strings["ABOUT_LINK"]}</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profileImage"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>{assets.localized_strings["SIGN_IN_TEXT"]}</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
