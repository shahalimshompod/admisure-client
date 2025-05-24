import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root.jsx";
import App from "./App.jsx";
import HomeLayout from "./layouts/HomeLayout.jsx";
import Colleges from "./Routes/Colleges.jsx";
import DetailsPage from "./Routes/detailsPage.jsx";
import Admission from "./Routes/Admission.jsx";
import LoginForm from "./Routes/LoginForm.jsx";
import RegisterForm from "./Routes/RegisterForm.jsx";
import AuthContextProvider from "./Auth/AuthContextProvider.jsx";
import MyProfile from "./Routes/MyProfile.jsx";
import ForgotPassword from "./Routes/ForgotPassword.jsx";
import AboutUs from "./Routes/AboutUs.jsx";
import SecureRoute from "./Routes/SecureRoute.jsx";
import PreventLoginRegisterRoute from "./Routes/PreventLoginRegisterRoute.jsx";
import MyCollege from "./Routes/MyCollege.jsx";
import ErrorPage from "./Routes/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        loader: () => {
          document.title = "Home | Admisure";
          return null;
        },
      },
      {
        path: "/colleges",
        element: <Colleges />,
        loader: () => {
          document.title = "Colleges | Admisure";
          return null;
        },
      },
      {
        path: "/college-details/:id",
        element: (
          <SecureRoute>
            <DetailsPage />
          </SecureRoute>
        ),
        loader: () => {
          document.title = "College Details | Admisure";
          return null;
        },
      },
      {
        path: "/admission",
        element: (
          <SecureRoute>
            <Admission />
          </SecureRoute>
        ),
        loader: () => {
          document.title = "Admission | Admisure";
          return null;
        },
      },
      {
        path: "/my-profile",
        element: (
          <SecureRoute>
            <MyProfile />
          </SecureRoute>
        ),
        loader: () => {
          document.title = "My Profile | Admisure";
          return null;
        },
      },
      {
        path: "/about-us",
        element: <AboutUs />,
        loader: () => {
          document.title = "About Us | Admisure";
          return null;
        },
      },
      {
        path: "/my-college",
        element: (
          <SecureRoute>
            <MyCollege />
          </SecureRoute>
        ),
        loader: () => {
          document.title = "My College | Admisure";
          return null;
        },
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PreventLoginRegisterRoute>
        <LoginForm />
      </PreventLoginRegisterRoute>
    ),
    loader: () => {
      document.title = "Login | Admisure";
      return null;
    },
  },
  {
    path: "/register",
    element: (
      <PreventLoginRegisterRoute>
        <RegisterForm />
      </PreventLoginRegisterRoute>
    ),
    loader: () => {
      document.title = "Register | Admisure";
      return null;
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    loader: () => {
      document.title = "Forgot Password | Admisure";
      return null;
    },
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
