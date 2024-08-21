import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";
import HomePage from "./HomaPage/HomePage";
import Profile from "./ProfilePage/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/home/:id" element={<HomePage />}></Route>
        <Route path="/home/profile/:id" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
