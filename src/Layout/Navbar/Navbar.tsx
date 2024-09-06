/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import "./Navbar.css";
import "./Dropdown.css";
import "./DialogCart.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAppDispatch } from "../../store/store";
import {
  getUserById,
  setUserData,
  UserDataSelector,
} from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import { gameDataSelector } from "../../store/slices/gameSlice";
import {
  clearErrorMessage,
  errorMessageSelector,
} from "../../store/slices/appSlice";

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
  const gameData = useSelector(gameDataSelector);
  const errorMessage = useSelector(errorMessageSelector);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const fetchuser = useCallback(async () => {
    try {
      showLoading();
      const { data: user } = await dispatch(getUserById()).unwrap();
      dispatch(setUserData(user));
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  }, [dispatch]);

  useEffect(() => {
    fetchuser();
  }, [fetchuser]);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      dispatch(clearErrorMessage());
    }
  }, [dispatch, errorMessage]);

  //render =============================================================================================
  const renderCart = () => {
    return (
      <div
        className={`dropdown-cart ${openDialogCart ? "active" : "inactive"}`}
      >
        <div className="cart">
          <h1>Your Cart</h1>
        </div>
        <div className="listCart">
          {gameData.map((item, index) => {
            return (
              <div key={index} className="grid-listCart">
                <img src={item.image} alt="" className="logoCart" />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
        <div className="show-price">
          <p>150</p>
        </div>
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
          <li
            onClick={() => {
              navigate(`/core/home/libaly`);
              setOpen(!open);
            }}
          >
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
        {/* <div className={ > 0 ? "isnumber" : "number"}>
          {}
        </div> */}
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
