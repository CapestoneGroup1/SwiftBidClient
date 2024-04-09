import React from "react";
import logo from '../../assets/images/logo.png'
import { useNavigate } from "react-router-dom";

export default function NavLogo() {
  const navigate = useNavigate()
  return (
    <>
      <img
        src={logo}
        onClick={() => navigate("/")}
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
