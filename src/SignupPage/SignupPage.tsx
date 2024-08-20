import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container-signup">
      <div className="warp-signup">
        <h1>SIGN UP</h1>
        <form>
          <h2>Frist Name</h2>
          <input type="text" placeholder="First Name..." />
          <h2>Last Name</h2>
          <input type="text" placeholder="Last Name..." />
          <h2>Username</h2>
          <input type="text" placeholder="Username..." />
          <h2>Password</h2>
          <input type="password" placeholder="Password..." />
          <h2>Email</h2>
          <input type="text" placeholder="Email..." />
          <div className="btn-signup">
            <div className="btn">
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
