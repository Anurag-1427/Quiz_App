import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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
          <h1 className="font-bold">EduChamp Quiz App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profileImage"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
