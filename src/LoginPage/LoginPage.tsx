import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { login } from "../store/slices/authSlice";

export interface LoginForm {
  email: string;
  password: string;
}

export interface Login {
  accessToken: string;
  userId: string;
}

export interface Response<Type> {
  data: Type;
  status: number;
}

const defaultValues: LoginForm = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm<LoginForm>({ defaultValues });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  //เมื่อกดปุ่ม login จะพาเข้าไปสู้หน้า home ===================================================================
  const submit = async (value: LoginForm) => {
    try {
      const item = {
        ...value,
      };
      showLoading();

      const { data: loginedData } = await dispatch(login(item)).unwrap();
      const decodedToken = jwtDecode(loginedData.accessToken);
      const cookies = new Cookies(null, {
        path: "/",
        expires: new Date(Number(decodedToken.exp) * 1000),
      });
      cookies.set("token", loginedData.accessToken);
      localStorage.setItem("token", loginedData.accessToken);

      navigate(`/core/home`);
    } catch (error) {
      alert("Username and password is wrong");
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <div className="container-login">
        <div className="warp-login">
          <h1>LOG IN</h1>
          <form onSubmit={handleSubmit(submit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <h2>Username</h2>
                    <input
                      {...field}
                      type="text"
                      placeholder="Username & email..."
                    />
                  </>
                );
              }}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <h2>Password</h2>
                    <input
                      {...field}
                      type="password"
                      placeholder="Password..."
                    />
                  </>
                );
              }}
            />
            <div className="btn-login">
              <button type="submit" className="btn">
                <p>Log In</p>
              </button>
              <div
                className="btn"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                <p>Sign In</p>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isLoading && (
        <div className="wrap-loding-login">
          <div className="loding" />
        </div>
      )}
    </>
  );
};

export default LoginPage;
