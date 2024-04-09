import React from "react";
import { useAppContext } from "../AppWrapper";
import { env } from "../../utils/env";

const navItem = {
  color: "white",
  marginRight: "2rem",
  textDecoration: "none",
};

export default function TopNavBar() {
  const { user } = useAppContext();
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <a href="/" style={navItem}>
        Home
      </a>
      {user && (
        <>
          <a href={env.routes.userprofile} style={navItem}>
            Profile
          </a>
          <a href={env.routes.wishlist} style={navItem}>
            Wishlist
          </a>
        </>
      )}
      <a href="contact" style={navItem}>
        Contact Us
      </a>
    </nav>
  );
}
