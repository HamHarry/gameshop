import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import SignupPage from "./SignupPage/SignupPage";
import HomePage from "./HomaPage/HomePage";
import Profile from "./ProfilePage/ProfilePage";
import PaymentPage from "./PaymentPage/PaymentPage";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import NotfoundPage from "./NotfoundPage/NotfoundPage";
import Contact from "./ContactPage/Contact";
import ProtectedRouteLogined from "./ProtectedRoutes/ProtectedRouteLogined";
import Layout from "./Layout/Layout";
import { Suspense } from "react";
import LibaryPage from "./Libary/LibaryPage";

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="" element={<ProtectedRouteLogined />}>
          <Route path="" element={<Navigate to="login" />} />
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="signup" element={<SignupPage />}></Route>
        </Route>
        <Route path="core" element={<ProtectedRoutes />}>
          <Route path="home" element={<Layout />}>
            <Route path="" element={<HomePage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="libary" element={<LibaryPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
