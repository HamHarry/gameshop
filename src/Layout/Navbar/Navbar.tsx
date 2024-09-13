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
import {
  addGameDataSelector,
  setDeleteGame,
  setSammary,
  summaryGameSelector,
} from "../../store/slices/gameSlice";
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
  const addGameData = useSelector(addGameDataSelector);
  const errorMessage = useSelector(errorMessageSelector);
  const summary = useSelector(summaryGameSelector);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const fetchuser = useCallback(async () => {
    try {
      showLoading();
      const user = await dispatch(getUserById()).unwrap();
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
          {addGameData.map((item, index) => {
            return (
              <div key={index} className="grid-listCart">
                <img src={item.image} alt="" className="logoCart" />
                <p>{item.name}</p>
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => {
                    dispatch(setDeleteGame(item));
                    dispatch(setSammary());
                  }}
                ></i>
              </div>
            );
          })}
        </div>
        <div className="show-price">
          <p>price:{` ${Intl.NumberFormat().format(summary.price)} THB`}</p>
          <p>VAT 7%: {` ${Intl.NumberFormat().format(summary.vat)} THB`}</p>
          <p>total: {` ${Intl.NumberFormat().format(summary.total)} THB`}</p>
        </div>
        <div className="btn-payment">
          <button
            onClick={() => {
              navigate(`/core/home/payment`);
              setOpenDialogCart(!openDialogCart);
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
              navigate(`/core/home/libary`);
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
        <div className={addGameData.length > 0 ? "isnumber" : "number"}>
          {addGameData.length}
        </div>
        <i
          className="fa-brands fa-steam"
          onClick={() => {
            navigate(`/core/home`);
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
