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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path: "/colleges",
        element: <Colleges />,
      },
      {
        path: "/college-details/:id",
        element: <DetailsPage />,
      },
      {
        path: "/admission",
        element: <Admission />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
