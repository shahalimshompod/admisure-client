import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContextProvider";

const PreventLoginRegisterRoute = ({ children }) => {
  // getting user from auth
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // checking if user exist
  if (!user) {
    return children;
  }

  return (
    <div className="w-full">
      <Navigate state={location.pathname} to="/"></Navigate>
    </div>
  );
};

export default PreventLoginRegisterRoute;
