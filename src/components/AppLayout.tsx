import React from "react";
import Header from "./Header";
import AppRoutes from "../pages/routes/AppRoutes";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}
