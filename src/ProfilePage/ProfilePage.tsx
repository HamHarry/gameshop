import { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";
import "./Dialog.css";

interface User {
  id: number;
  fname: string;
  lname: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>();
  const [editImage, setEditImage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const fetchuser = useCallback(async () => {
    const res = await axios.get(`https://www.melivecode.com/api/users/${id}`);
    const user = res.data.user;
    console.log(user);
    setUser(user);
  }, [id]);
  useEffect(() => {
    fetchuser();
  }, [fetchuser]);

  //edit image =============================================================
  const handleeditimage = async () => {
    try {
      const item = {
        id: id,
        avatar: editImage,
      };
      const res = await axios.put(
        "https://www.melivecode.com/api/users/update",
        item
      );
      const user = res.data.user;
      alert("updated image successfully");
      setOpen(!open);
      window.location.reload();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditImage(value);
  };

  const rendereditImage = () => {
    return (
      <dialog open={open}>
        <div className="container-dialog">
          <h3>Edit Profile Image :</h3>
          <input type="text" placeholder="Url..." onChange={handleImage} />
          <div className="submit-image" onClick={handleeditimage}>
            <p>SUBMIT</p>
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
              setOpen(!open);
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
            <div className="name">
              <p>
                Name: {user?.fname} {user?.lname}
              </p>
            </div>
            <div className="email">
              <p>Email: {user?.email}</p>
            </div>
            <div className="username">
              <p>Username: {user?.username}</p>
            </div>
          </div>
          <div className="changename">
            <p>Change Name</p>
          </div>
        </div>
      </div>
      {rendereditImage()}
    </div>
  );
};

export default Profile;
