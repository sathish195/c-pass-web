// import React from "react";
// eslint-disable-next-line no-unused-vars
import { Route, Navigate } from "react-router-dom";
import authService from "./services/authService";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
 
  return authService.getCurrentUser() ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/landing"/>
    </>
  );
};
export default ProtectedRoute;

