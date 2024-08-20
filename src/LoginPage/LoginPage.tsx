import { useState } from "react";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [valuePassword, setValuePassword] = useState<string>("");

  //เก็บค่า input username and password =================================================================
  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueInput(value);
  };
  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValuePassword(value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      const item = {
        username: valueInput,
        password: valuePassword,
      };
      const res = await axios.post(
        `https://www.melivecode.com/api/login`,
        item
      );
      const userData = res.data;
      console.log(userData);
    } catch (error) {
      alert("Username and password is wrong");
      console.log(error);
    }
  };

  return (
    <div className="container-login">
      <div className="warp-login">
        <h1>LOGIN</h1>
        <form>
          <h2>Username</h2>
          <input type="text" placeholder="Username..." onChange={handleUser} />
          <h2>Password</h2>
          <input
            type="password"
            placeholder="Password..."
            onChange={handlePass}
          />
          <div className="btn-login">
            <div className="btn" onClick={handleSubmit}>
              <p>Log In</p>
            </div>
            <div className="btn">
              <p>Sign In</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
