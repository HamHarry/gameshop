/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import "./Navbar.css";
import "./Dropdown.css";
import "./DialogCart.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Response } from "../../LoginPage/LoginPage";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../../store/store";
import { setUserData, UserDataSelector } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";

export interface User {
  _id: string;
  code?: number;
  fname: string;
  lname: string;
  username: string;
  email: string;
  birthdate: string;
  image: string;
  device?: any[];
  summaryScore?: any;
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openDialogCart, setOpenDialogCart] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userData = useSelector(UserDataSelector);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const fetchuser = useCallback(async () => {
    try {
      showLoading();
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const res: Response<User> = await axios.get(
          `https://phandal-backend.vercel.app/api/user/profile/${decodedToken.sub}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = res.data;
        dispatch(setUserData(user));
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  }, [dispatch]);

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
              navigate(`/core/home/payment`);
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
            {userData?.fname} {userData?.lname}
          </h3>
        </div>
        <ul>
          <li
            onClick={() => {
              navigate(`/core/home/profile`);
              setOpen(!open);
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
              navigate(`/core/home/contact`);
              setOpen(!open);
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
            navigate(`/core/home`);
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
            src={userData?.image}
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
