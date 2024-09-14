import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { signup } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";

export interface SignupForm {
  username: string;
  fname: string;
  lname: string;
  email: string;
  birthdate: string;
  password: string;
  image?: string;
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
  const dispatch = useAppDispatch();

  const schema = yup.object({
    username: yup.string().required("Username is required"),
    fname: yup.string().required("FirstName is required"),
    lname: yup.string().required("LastName is required"),
    email: yup.string().email("Must enter email").required("Email is required"),
    birthdate: yup.string().required("Birthdate is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "password must contain at least one number")
      .matches(/[A-Z]/, "password must contain at least one Uppercase")
      .matches(/[a-z]/, "password must contain at least one Lowercase")
      .required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ defaultValues, resolver: yupResolver(schema) });

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
      await dispatch(signup(item)).unwrap();
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
                    <p className="error">{errors.fname?.message}</p>
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
                    <p className="error">{errors.lname?.message}</p>
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
                    <input
                      {...field}
                      type="date"
                      placeholder="Birthday..."
                      className="signin-birthdate"
                    />
                    <p className="error">{errors.birthdate?.message}</p>
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
                    <p className="error">{errors.email?.message}</p>
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
                    <p className="error">{errors.username?.message}</p>
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
                    <p className="error">{errors.password?.message}</p>
                  </>
                );
              }}
            />
            <div className="btn-signup">
              <button type="submit" className="btn">
                Sign In
              </button>
              <button
                className="btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && (
        <div className="wrap-loding-signup">
          <div className="loding" />
        </div>
      )}
    </>
  );
};

export default SignupPage;
