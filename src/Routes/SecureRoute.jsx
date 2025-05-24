import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContextProvider";

const SecureRoute = ({ children }) => {
  // getting user from auth
  const { user, gettingUserLoading } = useContext(AuthContext);
  const location = useLocation();

  // checking if there is any loading
  if (gettingUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-neutral"></span>
      </div>
    );
  }

  // checking if user exist
  if (user?.email) {
    return children;
  }

  return (
    <div className="w-full">
      <Navigate state={location.pathname} to="/login"></Navigate>
    </div>
  );
};

export default SecureRoute;
