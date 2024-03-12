import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import { env } from "../../utils/env";
import HideIfLoggedIN from "../../components/HideIfLoggedIN";
import Login from "../login/Login";
import Signup from "../signup/SignUp";
import ForgotPassword from "../forgotpassword/ForgotPassword";
import Logout from "../login/Logout";
import PendingApprovals from "../Admin/PendingApprovals";
import RoleBasedAccess from "../../components/RoleBasedAccess";
import AddProduct from "../AddProduct/AddProduct";
import ShowIfLoggedIn from "../../components/ShowIfLoggedIn";

import ProductCompleteInformation from "../ProductCompleteInformation/ProductCompleteInformation";
import UserProfile from "../userProfile/userProfile";
import UserProducts from "../UserProducts/UserProducts";

import ProductCategories from "../Admin/ProductCategories";
import AllProducts from "../AllProducts/AllProducts";

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
          element={<HideIfLoggedIN element={<Signup />} />}
        />
        <Route
          path={env.routes.forgotpassword}
          element={<HideIfLoggedIN element={<ForgotPassword />} />}
        />
        <Route path={env.routes.logout} element={<Logout />} />
        <Route
          path={env.routes.admin}
          element={<RoleBasedAccess element={<PendingApprovals />} />}
        />
        <Route
          path={env.routes.addproduct}
          element={<ShowIfLoggedIn element={<AddProduct />} />}
        />
         <Route
          path={env.routes.myproducts}
          element={<ShowIfLoggedIn element={<UserProducts />} />}
        />
         <Route
          path={env.routes.productinfo}
          element={<ShowIfLoggedIn element={<ProductCompleteInformation />} />}
        />
         <Route
          path={env.routes.allproducts}
          element={<ShowIfLoggedIn element={<AllProducts />} />}
        />
        <Route
          path={env.routes.categories}
          element={<RoleBasedAccess element={<ProductCategories />} />}
        />
         <Route
          path={env.routes.userprofile}
          element={<ShowIfLoggedIn element={<UserProfile />} />}
        />
      </Routes>
    </>
  );
}