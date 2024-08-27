import { useCallback, useEffect, useState } from "react";
import "./Navbar.css";
import "./Dropdown.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface User {
  id: number;
  fname: string;
  lname: string;
  username: string;
  avatar: string;
}

const Navbar = () => {
  const [users, setUsers] = useState<User>();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchuser = useCallback(async () => {
    const res = await axios.get(`https://www.melivecode.com/api/users/${id}`);
    const user = res.data.user;
    console.log(user);
    setUsers(user);
  }, [id]);
  useEffect(() => {
    fetchuser();
  }, [fetchuser]);

  return (
    <div className="container-navbar">
      <i
        className="fa-brands fa-steam"
        onClick={() => {
          navigate(`/home/${users?.id}`);
          window.location.reload();
        }}
      ></i>
      <div className="navbar-right">
        <i className="fa-solid fa-cart-shopping"></i>
        <img
          src={users?.avatar}
          alt="logo"
          onClick={() => {
            setOpen(!open);
          }}
        />
        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <div className="user">
            <h3>
              {users?.fname} {users?.lname}
            </h3>
          </div>
          <ul>
            <li
              onClick={() => {
                navigate(`/home/profile/${users?.id}`);
              }}
            >
              <i className="fa-solid fa-user"></i>
              <p>Profile</p>
            </li>
            <li>
              <i className="fa-solid fa-gamepad"></i>
              <p>Libary</p>
            </li>
            <li>
              <i className="fa-solid fa-gear"></i>
              <p>Setting</p>
            </li>
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <p>Log out</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
