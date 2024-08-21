import { useCallback, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";

interface User {
  id: number;
  fname: string;
  lname: string;
  username: string;
  password: string;
  avatar: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>();
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

  return (
    <div className="container-profile">
      <Navbar />
      <div className="warp-container-profile">
        <div className="image">
          <img src={user?.avatar} alt="LOGO" />
          <div className="edit">
            <p>Edit profile</p>
          </div>
        </div>
        <div className="warp-information">
          <div className="information">
            <div className="name">
              <p>
                Name: {user?.fname} {user?.lname}
              </p>
            </div>
            <div className="id">
              <p>ID: {user?.id}</p>
            </div>
            <div className="username">
              <p>Username: {user?.username}</p>
            </div>
          </div>
          <div className="password">
            <p>Change password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
