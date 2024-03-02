import React from "react";
import AppRoutes from "../pages/routes/AppRoutes";
import styles from "../assets/css/AppLayout.module.css";
import Base from "./Base";

export default function AppLayout() {
  return (
    <>
      <Base>
        <main className={styles.main}>
          <AppRoutes />
        </main>
      </Base>
    </>
  );
}
