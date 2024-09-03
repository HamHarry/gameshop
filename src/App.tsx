import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";
import HomePage from "./HomaPage/HomePage";
import Profile from "./ProfilePage/ProfilePage";
import PaymentPage from "./PaymentPage/PaymentPage";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import NotfoundPage from "./NotfoundPage/NotfoundPage";
import Contact from "./ContactPage/Contact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home/:userId" element={<HomePage />}></Route>
          <Route path="/home/profile/:userId" element={<Profile />}></Route>
          <Route path="/home/payment/:userId" element={<PaymentPage />}></Route>
          <Route path="/home/contact/:userId" element={<Contact />}></Route>
        </Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
}

export default App;
