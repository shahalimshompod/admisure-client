import React from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Root = () => {
  const { pathname } = useLocation();

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
