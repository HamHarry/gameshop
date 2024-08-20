import "./LoginPage.css";
const LoginPage = () => {
  return (
    <div className="container-login">
      <div className="warp-login">
        <h1>LOGIN</h1>
        <form>
          <h2>Username</h2>
          <input type="text" placeholder="Username..." />
          <h2>Password</h2>
          <input type="password" placeholder="Password..." />
          <div className="btn-login">
            <div className="btn">
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
