import React from "react";
import { Route, Routes } from "react-router-dom";
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
import DeclareWinners from "../Admin/DeclareWinners";
import UserWinnings from "../AllProducts/UserWinnings";
import UserWishList from "../AllProducts/UserWishList";
import SwiftBidHome from "../Home/SwiftBidHome";
import PaymentCards from "../userProfile/PaymentCards";
import Winners from "../Admin/Winners";
import ContactUs from "../Home/ContactUs";
import Queries from "../Admin/Queries";
import CategoriesList from "../Admin/CategoriesList";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SwiftBidHome />} />
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
          path={env.routes.winnings}
          element={<ShowIfLoggedIn element={<UserWinnings />} />}
        />
        <Route
          path={env.routes.wishlist}
          element={<ShowIfLoggedIn element={<UserWishList />} />}
        />
        <Route
          path={env.routes.categories}
          element={<RoleBasedAccess element={<CategoriesList />} />}
        />
        <Route
          path={env.routes.decalrewinners}
          element={<RoleBasedAccess element={<DeclareWinners />} />}
        />
        <Route
          path={env.routes.winners}
          element={<RoleBasedAccess element={<Winners />} />}
        />
        <Route
          path={env.routes.queries}
          element={<RoleBasedAccess element={<Queries />} />}
        />
        <Route
          path={env.routes.userprofile}
          element={<ShowIfLoggedIn element={<UserProfile />} />}
        />
        <Route
          path={env.routes.savedcards}
          element={<ShowIfLoggedIn element={<PaymentCards />} />}
        />
        <Route
          path={env.routes.contact}
          element={<ShowIfLoggedIn element={<ContactUs />} />}
        />
      </Routes>
    </>
  );
}
