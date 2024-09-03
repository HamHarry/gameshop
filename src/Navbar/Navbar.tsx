/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import "./Navbar.css";
import "./Dropdown.css";
import "./DialogCart.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Response } from "../LoginPage/LoginPage";
import Cookies from "universal-cookie";

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

const Navbar = () => {
  const [users, setUsers] = useState<User>();
  const [open, setOpen] = useState(false);
  const [openDialogCart, setOpenDialogCart] = useState<boolean>(false);
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

  //render =============================================================================================
  const renderCart = () => {
    return (
      <div
        className={`dropdown-cart ${openDialogCart ? "active" : "inactive"}`}
      >
        <div className="cart">
          <h1>Your Cart</h1>
        </div>
        <div className="listCart"></div>
        <div className="btn-payment">
          <button
            onClick={() => {
              navigate(`/home/payment/${users?._id}`);
            }}
          >
            Payment
          </button>
        </div>
      </div>
    );
  };
  const renderProfile = () => {
    return (
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
          <li
            onClick={() => {
              navigate(`/home/contact/${users?._id}`);
            }}
          >
            <i className="fa-solid fa-id-badge"></i>
            <p>Contact</p>
          </li>
          <li
            onClick={() => {
              navigate("/");
              const cookies = new Cookies(null, {
                path: "/",
              });
              localStorage.removeItem("token");
              cookies.remove("token");
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Log out</p>
          </li>
        </ul>
      </div>
    );
  };

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
              setOpen(false);
            }}
          ></i>
          {renderCart()}
          <img
            src={users?.image}
            alt="logo"
            onClick={() => {
              setOpen(!open);
              setOpenDialogCart(false);
            }}
          />
          {renderProfile()}
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
