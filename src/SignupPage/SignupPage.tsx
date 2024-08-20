import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [valueFname, setValueFname] = useState<string>("");
  const [valueLname, setValueLname] = useState<string>("");
  const [valueusername, setValueUsername] = useState<string>("");
  const [valuepassword, setValuePassword] = useState<string>("");
  const [valueemail, setValueEmail] = useState<string>("");
  const navigate = useNavigate();

  //เก็บค่า input ทั้งหมด ========================================================================
  const handleFname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueFname(value);
  };
  const handleLname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueLname(value);
  };
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueUsername(value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValuePassword(value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueEmail(value);
  };

  //กดเพื่อเก็บค่าที่ถูกกรอก =================================================================================
  const handleSubmit = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const item = {
        fname: valueFname,
        lname: valueLname,
        username: valueusername,
        password: valuepassword,
        email: valueemail,
        avatar:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      };
      const res = await axios.post(
        "https://www.melivecode.com/api/users/create",
        item
      );
      const userData = res.data;
      console.log(userData);
      alert("SignUp successful");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-signup">
      <div className="warp-signup">
        <h1>SIGN UP</h1>
        <form>
          <h2>Frist Name</h2>
          <input
            type="text"
            placeholder="First Name..."
            onChange={handleFname}
          />
          <h2>Last Name</h2>
          <input
            type="text"
            placeholder="Last Name..."
            onChange={handleLname}
          />
          <h2>Username</h2>
          <input
            type="text"
            placeholder="Username..."
            onChange={handleUsername}
          />
          <h2>Password</h2>
          <input
            type="password"
            placeholder="Password..."
            onChange={handlePassword}
          />
          <h2>Email</h2>
          <input type="text" placeholder="Email..." onChange={handleEmail} />
          <div className="btn-signup">
            <div className="btn" onClick={handleSubmit}>
              <p>Sign In</p>
            </div>
            <div
              className="btn"
              onClick={() => {
                navigate("/");
              }}
            >
              <p>Log In</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
