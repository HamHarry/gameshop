import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoutes = () => {
  const cookies = new Cookies(null, {
    path: "/",
  });
  const token = cookies.get("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
