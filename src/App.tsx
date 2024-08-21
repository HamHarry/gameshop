import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";
import HomePage from "./HomaPage/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/home/:id" element={<HomePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
