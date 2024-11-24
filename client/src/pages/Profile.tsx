import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice";

interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
}

interface RootState {
  user: {
    currentUser: User | null;
    loading: boolean;
    error: string | boolean;
  };
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePercent, setImagePercent] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      () => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/update/${currentUser?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error: unknown) {
      // Check if the error is an instance of Error or a string
      if (error instanceof Error) {
        dispatch(updateUserFailure(error.message)); // Using error.message if it's an instance of Error
      } else if (typeof error === "string") {
        dispatch(updateUserFailure(error)); // If it's a string
      } else {
        dispatch(updateUserFailure("An unknown error occurred")); // Default error message
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/delete/${currentUser!._id}`, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error: unknown) {
      // Check if the error is an instance of Error or a string
      if (error instanceof Error) {
        dispatch(updateUserFailure(error.message)); // Using error.message if it's an instance of Error
      } else if (typeof error === "string") {
        dispatch(updateUserFailure(error)); // If it's a string
      } else {
        dispatch(updateUserFailure("An unknown error occurred")); // Default error message
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/signout`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      });
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const getImageStatusMessage = () => {
    if (imageError) {
      return (
        <span className="text-red-700">
          Error uploading image (file size must be less than 2 MB)
        </span>
      );
    } else if (imagePercent > 0 && imagePercent < 100) {
      return (
        <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
      );
    } else if (imagePercent === 100) {
      return (
        <span className="text-green-700">Image uploaded successfully</span>
      );
    }
    return "";
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files ? e.target.files[0] : undefined)
          }
        />
        <button
          type="button"
          className="h-24 w-24 self-center rounded-full overflow-hidden mt-2 focus:outline-none"
          onClick={() => fileRef.current?.click()}
        >
          <img
            src={formData.profilePicture || currentUser?.profilePicture}
            alt="profile"
            className="h-full w-full object-cover"
          />
        </button>
        <p className="text-sm self-center">{getImageStatusMessage()}</p>
        <input
          defaultValue={currentUser?.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser?.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <button
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </button>
        <button onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </button>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "User is updated successfully!"}
      </p>
    </div>
  );
};

export default Profile;
