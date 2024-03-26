import React from "react";

const navItem = {
  color: "white",
  marginRight: "1rem",
  textDecoration: "none",
};

export default function TopNavBar() {
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
      <a href="aboutus" style={navItem}>
        About
      </a>
      <a href="contact" style={navItem}>
        Contact
      </a>
    </nav>
  );
}