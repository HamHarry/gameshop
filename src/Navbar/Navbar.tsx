/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import "./Navbar.css";
import "./Dropdown.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Response } from "../LoginPage/LoginPage";

export interface User {
  _id: string;
  code?: number;
  fname?: string;
  lname?: string;
  username: string;
  email: string;
  birthdate: string;
  image: string;
  device?: any[];
  summaryScore?: any;
}

interface NavbarProps {
  openDialogCart: boolean;
  setOpenDialogCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({
  openDialogCart,
  setOpenDialogCart,
}) => {
  const [users, setUsers] = useState<User>();
  const [open, setOpen] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const fetchuser = useCallback(async () => {
    try {
      showLoading();
      const token = localStorage.getItem("token");
      const res: Response<User> = await axios.get(
        `https://phandal-backend.vercel.app/api/user/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = res.data;
      console.log(user);

      setUsers(user);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  }, [userId]);

  useEffect(() => {
    fetchuser();
  }, [fetchuser]);

  return (
    <>
      <div className="container-navbar">
        <i
          className="fa-brands fa-steam"
          onClick={() => {
            navigate(`/home/${users?._id}`);
            window.location.reload();
          }}
        ></i>
        <div className="navbar-right">
          <i
            className="fa-solid fa-cart-shopping"
            onClick={() => {
              setOpenDialogCart(!openDialogCart);
            }}
          ></i>
          <img
            src={users?.image}
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
                  navigate(`/home/profile/${users?._id}`);
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
      {isLoading && (
        <div className="wrap-loding">
          <div className="loding" />
        </div>
      )}
    </>
  );
};

export default Navbar;
