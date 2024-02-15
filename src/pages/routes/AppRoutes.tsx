import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
import Home from "../Home/Home";
import { env } from "../../utils/env";
import ForgotPassword from "../forgotpassword/ForgotPassword";
import HideIfLoggedIN from "../../components/HideIfLoggedIN";
import Logout from "../login/Logout";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={env.routes.login}
          element={<HideIfLoggedIN element={<Login />} />}
        />
        <Route
          path={env.routes.signup}
          element={<HideIfLoggedIN element={<SignUp />} />}
        />
        <Route
          path={env.routes.forgotpassword}
          element={<HideIfLoggedIN element={<ForgotPassword />} />}
        />
        <Route
          path={env.routes.logout}
          element={<Logout/>}
        />
      </Routes>
    </>
  );
}
