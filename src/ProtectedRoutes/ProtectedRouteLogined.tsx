import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRouteLogined = () => {
  const cookies = new Cookies(null, {
    path: "/",
  });
  const token = cookies.get("token");
  return !token ? (
    <Outlet />
  ) : (
    <Navigate to="core/home/66d0dbe51219290742088f7b" />
  );
};

export default ProtectedRouteLogined;
