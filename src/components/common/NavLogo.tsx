import React from "react";
import logo from '../../assets/images/logo.png'

export default function NavLogo() {
  return (
    <>
      <img
        src={logo}
        alt="swiftbid"
        style={{
          width: "4rem",
          height: "4rem",
          objectFit: "contain",
          mixBlendMode: "darken",
        }}
      />
    </>
  );
}
