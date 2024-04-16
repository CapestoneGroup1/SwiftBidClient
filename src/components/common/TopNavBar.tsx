import React from "react";
import { useAppContext } from "../AppWrapper";
import { env } from "../../utils/env";

const navItem = {
  marginRight: "2rem",
  textDecoration: "none",
  fontWeight: 500,
  color: 'white'
};

export default function TopNavBar() {
  const { user } = useAppContext();
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        color: 'white'
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
