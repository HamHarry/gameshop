import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

interface SignupForm {
  username: string;
  fname: string;
  lname: string;
  email: string;
  birthdate: string;
  password: string;
  image: string;
}
const defaultValues: SignupForm = {
  username: "",
  email: "",
  birthdate: "",
  password: "",
  fname: "",
  lname: "",
  image: "",
};

const SignupPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<SignupForm>({ defaultValues });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  //กดเพื่อเก็บค่าที่ถูกกรอก =================================================================================
  const submit = async (value: SignupForm) => {
    try {
      showLoading();
      const item = {
        ...value,
        image:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      };
      const res = await axios.post(
        "https://phandal-backend.vercel.app/api/user/register",
        item
      );
      console.log(item);

      const userData = res.data;
      console.log(userData);
      alert("SignUp successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("SignUp failed");
    } finally {
      hideLoading();
    }
  };
  return (
    <>
      <div className="container-signup">
        <div className="warp-signup">
          <h1>SIGN UP</h1>
          <form onSubmit={handleSubmit(submit)}>
            <Controller
              name="fname"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <h2>Frist Name</h2>
                    <input {...field} type="text" placeholder="First Name..." />
                  </>
                );
              }}
            />
            <Controller
              name="lname"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <h2>Last Name</h2>
                    <input {...field} type="text" placeholder="Last Name..." />
                  </>
                );
              }}
            />
            <Controller
              name="birthdate"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <h2>Birthday</h2>
                    <input {...field} type="date" placeholder="Birthday..." />
                  </>
                );
              }}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <h2>Email</h2>
                    <input {...field} type="text" placeholder="Email..." />
                  </>
                );
              }}
            />
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
                    <input
                      {...field}
                      type="password"
                      placeholder="Password..."
                    />
                  </>
                );
              }}
            />
            <div className="btn-signup">
              <button className="btn">
                <p>Sign In</p>
              </button>
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
      {isLoading && (
        <div className="wrap-loding">
          <div className="loding" />
        </div>
      )}
    </>
  );
};

export default SignupPage;
