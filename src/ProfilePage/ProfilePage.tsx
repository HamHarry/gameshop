import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import "./DialogImage.css";
import "./DialogChangeName.css";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { UserDataSelector } from "../store/slices/userSlice";

interface UserForm {
  fname: string;
  lname: string;
  email: string;
  birthdate: string;
  image: string;
}
const defaultValues: UserForm = {
  fname: "",
  lname: "",
  email: "",
  birthdate: "",
  image: "",
};

const Profile = () => {
  const [openDialog1, setOpenDialog1] = useState<boolean>(false);
  const [openDialog2, setOpenDialog2] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userData = useSelector(UserDataSelector);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const {
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { isDirty },
  } = useForm<UserForm>({
    defaultValues,
  });

  const initailForm = useCallback(() => {
    if (!userData) return;

    const { fname, lname, email, birthdate, image } = userData;
    const userForm: UserForm = {
      fname,
      lname,
      email,
      birthdate,
      image,
    };
    reset(userForm);
  }, [reset, userData]);

  useEffect(() => {
    initailForm();
  }, [initailForm]);

  //handleSubmit ==========================================================================================
  const onSubmit = async (value: UserForm) => {
    try {
      if (!userData) return;

      showLoading();
      setOpenDialog2(false);
      setOpenDialog1(false);
      const item = {
        ...userData,
        ...value,
      };

      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/${userData._id}`,
        item,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = res.data;
      console.log(user);
      window.location.reload();
      initailForm();
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };
  // rederpage ========================================================================================
  const renderEditImage = () => {
    return (
      <dialog onClose={() => reset()} open={openDialog1}>
        <div className="warp-loding-background">
          <div className="container-dialog-editImage">
            <div className="nav-dialog">
              <i
                className="fa-solid fa-circle-xmark"
                onClick={() => {
                  setOpenDialog1(!openDialog1);
                }}
              ></i>
            </div>
            <div className="showImage">
              <img src={getValues("image")} alt="preview" />
            </div>
            <div className="inputImageURL">
              <h3>Edit Profile Image :</h3>
              <div className="URL">
                <Controller
                  control={control}
                  name="image"
                  render={({ field }) => {
                    return (
                      <input {...field} type="text" placeholder="Url..." />
                    );
                  }}
                />
                <button
                  type="submit"
                  className="btn-upload"
                  disabled={!isDirty}
                >
                  <p>SUBMIT</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    );
  };
  const renderChangeName = () => {
    return (
      <dialog onClose={() => reset()} open={openDialog2}>
        <div className="warp-loding-background">
          <div className="container-dialog-ChangeName">
            <div className="nav-dialog">
              <i
                className="fa-solid fa-circle-xmark"
                onClick={() => {
                  setOpenDialog2(!openDialog2);
                }}
              ></i>
            </div>
            <div className="warp-dialog">
              <div className="edit-fname">
                <p>Frist Name:</p>
                <Controller
                  control={control}
                  name="fname"
                  render={({ field }) => {
                    return (
                      <input
                        {...field}
                        type="text"
                        placeholder="Frist Name..."
                      />
                    );
                  }}
                />
              </div>
              <div className="edit-lname">
                <p>Last Name:</p>
                <Controller
                  control={control}
                  name="lname"
                  render={({ field }) => {
                    return (
                      <input
                        {...field}
                        type="text"
                        placeholder="Last Name..."
                      />
                    );
                  }}
                />
              </div>
              <div className="edit-birthdate">
                <p>Birthday:</p>
                <Controller
                  control={control}
                  name="birthdate"
                  render={({ field }) => {
                    return (
                      <input
                        {...field}
                        type="date"
                        placeholder="Birthday..."
                        className="input-birtdate"
                      />
                    );
                  }}
                />
              </div>
              <div className="edit-email">
                <p>Email:</p>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <input {...field} type="text" placeholder="Email..." />
                    );
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn-edit-submit"
                disabled={!isDirty}
              >
                <p>SUBMIT</p>
              </button>
            </div>
          </div>
        </div>
      </dialog>
    );
  };

  return (
    <>
      <div className="container-profile">
        <div className="warp-container-profile">
          <div className="image">
            <img src={userData?.image} alt="LOGO" />
            <div
              className="edit"
              onClick={() => {
                setOpenDialog1(!openDialog1);
              }}
            >
              <p>Edit profile</p>
            </div>
          </div>
          <div className="warp-information">
            <div className="information">
              <div className="id">
                <p>ID: {userData?.code}</p>
              </div>
              <div className="username">
                <p>Username: {userData?.username}</p>
              </div>
              <div className="name">
                <p>
                  Name: {userData?.fname} {userData?.lname}
                </p>
              </div>
              <div className="email">
                <p>Email: {userData?.email}</p>
              </div>
              <div className="email">
                <p>Birthday: {userData?.birthdate}</p>
              </div>
            </div>
            <div
              className="changename"
              onClick={() => {
                setOpenDialog2(!openDialog2);
              }}
            >
              <p>Change Name</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderEditImage()}
          {renderChangeName()}
        </form>
      </div>
      {isLoading && (
        <div className="warp-loding-profile">
          <div className="loding" />
        </div>
      )}
    </>
  );
};

export default Profile;
