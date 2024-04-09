import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppWrapper";
import Login from "../pages/login/Login";

type ShowIfLoggedInProps = {
  element: React.ReactNode;
};

export default function ShowIfLoggedIn(props: ShowIfLoggedInProps) {
  const { isUserLoggedIN, token } = useAppContext();

  if (token || isUserLoggedIN) {
    return <>{props.element}</>;
  } else if (localStorage.getItem("token")) {
    return <></>;
  } else {
    return (
      <>
        <Login />
      </>
    );
  }
}
