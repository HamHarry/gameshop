import { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";
import "./DialogImage.css";
import "./DialogChangeName.css";
import { Controller, useForm } from "react-hook-form";

interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

interface UserForm {
  fname: string;
  lname: string;
  email: string;
  avatar: string;
}
const defaultValues: UserForm = {
  fname: "",
  lname: "",
  email: "",
  avatar: "",
};

const Profile = () => {
  const [user, setUser] = useState<User>();
  const [openDialog1, setOpenDialog1] = useState<boolean>(false);
  const [openDialog2, setOpenDialog2] = useState<boolean>(false);
  const { id } = useParams();

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
    const res = await axios.get(`https://www.melivecode.com/api/users/${id}`);
    const user = res.data.user;
    console.log(user);
    setUser(user);
  }, [id]);

  useEffect(() => {
    fetchuser();
  }, [fetchuser]);

  //handleSubmit ==========================================================================================
  const onSubmit = async (value: UserForm) => {
    setOpenDialog2(false);
    setOpenDialog1(false);
    const item = {
      id: id,
      ...value,
    };
    const res = await axios.put(
      "https://www.melivecode.com/api/users/update",
      item
    );
    const userData = res.data.user;
    console.log(userData);
    alert("User updated successfully");
    reset();
    fetchuser();
    window.location.reload();
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
            <img src={getValues("avatar")} alt="preview" />
          </div>
          <div className="inputImageURL">
            <h3>Edit Profile Image :</h3>
            <div className="URL">
              <Controller
                control={control}
                name="avatar"
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
    <div className="container-profile">
      <Navbar />
      <div className="warp-container-profile">
        <div className="image">
          <img src={user?.avatar} alt="LOGO" />
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
              <p>ID: {user?.id}</p>
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
  );
};

export default Profile;
