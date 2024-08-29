import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { Controller, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
}

const defaultValues: LoginForm = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<LoginForm>({ defaultValues });

  //เมื่อกดปุ่ม login จะพาเข้าไปสู้หน้า home ===================================================================
  const submit = async (value: LoginForm) => {
    try {
      const item = {
        ...value,
      };
      const res = await axios.post(
        `https://www.melivecode.com/api/login`,
        item
      );
      const userData = res.data;

      const decodedToken = jwtDecode(userData.accessToken);
      const cookies = new Cookies(null, {
        path: "/",
        maxAge: decodedToken.exp,
      });
      cookies.set("token", userData.accessToken);

      navigate(`/home/${userData.user.id}`);
    } catch (error) {
      alert("Username and password is wrong");
      console.log(error);
    }
  };

  return (
    <div className="container-login">
      <div className="warp-login">
        <h1>LOG IN</h1>
        <form onSubmit={handleSubmit(submit)}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <h2>Username</h2>
                  <input {...field} type="text" placeholder="Username..." />
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
                  <input {...field} type="password" placeholder="Password..." />
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
  );
};

export default LoginPage;
