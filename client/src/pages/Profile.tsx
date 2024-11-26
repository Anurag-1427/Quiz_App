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
import { assets } from "../assets";

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
      const res = await fetch(`/api/user/update/${currentUser?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(updateUserFailure(error.message))
      } else if (typeof error === "string") {
        dispatch(updateUserFailure(error));
      } else {
        dispatch(updateUserFailure(assets.localized_strings["UNKNOWN_ERROR_TEXT"]));
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser?._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(updateUserFailure(error.message));
      } else if (typeof error === "string") {
        dispatch(updateUserFailure(error));
      } else {
        dispatch(updateUserFailure(assets.localized_strings["UNKNOWN_ERROR_TEXT"]));
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch(`/api/auth/signout`);
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const getImageStatusMessage = () => {
    if (imageError) {
      return (
        <span className="text-red-700">
          {assets.localized_strings["ERROR_UPLOADING_IMAGE"]}
        </span>
      );
    } else if (imagePercent > 0 && imagePercent < 100) {
      return (
        <span className="text-slate-700">{`${assets.localized_strings["UPLOADING_TEXT"]} ${imagePercent} %`}</span>
      );
    } else if (imagePercent === 100) {
      return (
        <span className="text-green-700">{assets.localized_strings["IMAGE_UPLOAD_SUCCESS"]}</span>
      );
    }
    return "";
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">{assets.localized_strings["PROFILE_TEXT"]}</h1>
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
          placeholder={assets.localized_strings["USERNAME_PLACEHOLDER"]}
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser?.email}
          type="email"
          id="email"
          placeholder={assets.localized_strings["EMAIL_PLACEHOLDER"]}
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder={assets.localized_strings["PASSWORD_PLACEHOLDER"]}
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? assets.localized_strings["LOADING_TEXT"] : assets.localized_strings["UPDATE_TEXT"]}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <button
          onClick={handleDeleteAccount}
          className="text-red-700 cursor-pointer"
        >
          {assets.localized_strings["DELETE_ACCOUNT_TEXT"]}
        </button>
        <button onClick={handleSignOut} className="text-red-700 cursor-pointer">
          {assets.localized_strings["SIGN_OUT_TEXT"]}
        </button>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && assets.localized_strings["USER_UPDATE_SUCCESS"]}
      </p>
    </div>
  );
};

export default Profile;
