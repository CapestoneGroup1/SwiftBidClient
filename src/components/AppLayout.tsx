import React from "react";
import Header from "./Header";
import AppRoutes from "../pages/routes/AppRoutes";
import Footer from "./Footer";
import styles from '../assets/css/AppLayout.module.css';

export default function AppLayout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}
