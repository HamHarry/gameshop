import { useCallback, useEffect, useState } from "react";
import Navbar, { User } from "../Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";
import "./DialogImage.css";
import "./DialogChangeName.css";
import { Controller, useForm } from "react-hook-form";

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
  const [user, setUser] = useState<User>();
  const [openDialog1, setOpenDialog1] = useState<boolean>(false);
  const [openDialog2, setOpenDialog2] = useState<boolean>(false);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const fetchuser = useCallback(async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `https://phandal-backend.vercel.app/api/user/profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const user = res.data;
    console.log(user);
    setUser(user);

    const { fname, lname, email, birthdate, image } = user;
    const userForm: UserForm = {
      fname,
      lname,
      email,
      birthdate,
      image,
    };
    reset(userForm);
  }, [reset, userId]);

  useEffect(() => {
    fetchuser();
  }, [fetchuser]);

  //handleSubmit ==========================================================================================
  const onSubmit = async (value: UserForm) => {
    try {
      showLoading();
      setOpenDialog2(false);
      setOpenDialog1(false);
      const item = {
        ...user,
        ...value,
      };

      const token = localStorage.getItem("token");
      const res = await axios.put(
        `https://phandal-backend.vercel.app/api/user/${userId}`,
        item,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = res.data;
      console.log(userData);
      window.location.reload();
      alert("User updated successfully");
      fetchuser();
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
        <div className="container-dialog">
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
                  return <input {...field} type="text" placeholder="Url..." />;
                }}
              />
              <button type="submit" className="btn-upload" disabled={!isDirty}>
                <p>SUBMIT</p>
              </button>
            </div>
          </div>
        </div>
      </dialog>
    );
  };
  const renderChangeName = () => {
    return (
      <dialog onClose={() => reset()} open={openDialog2}>
        <div className="container-dialog">
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
                    <input {...field} type="text" placeholder="Frist Name..." />
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
                    <input {...field} type="text" placeholder="Last Name..." />
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
                    <input {...field} type="date" placeholder="Birthday..." />
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
      </dialog>
    );
  };

  return (
    <>
      <div className="container-profile">
        <Navbar />
        <div className="warp-container-profile">
          <div className="image">
            <img src={user?.image} alt="LOGO" />
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
                <p>ID: {user?.code}</p>
              </div>
              <div className="username">
                <p>Username: {user?.username}</p>
              </div>
              <div className="name">
                <p>
                  Name: {user?.fname} {user?.lname}
                </p>
              </div>
              <div className="email">
                <p>Email: {user?.email}</p>
              </div>
              <div className="email">
                <p>Birthday: {user?.birthdate}</p>
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
        <div className="wrap-loding-register">
          <div className="loding-register" />
        </div>
      )}
    </>
  );
};

export default Profile;
