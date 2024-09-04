import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { Suspense } from "react";

const Layout = () => {
  return (
    <div className="cotainer-all">
      <Navbar />
      <Suspense>
        <>
          <Outlet />
        </>
      </Suspense>
    </div>
  );
};

export default Layout;
