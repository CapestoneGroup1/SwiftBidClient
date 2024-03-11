import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppWrapper";

type ShowIfLoggedInProps = {
  element: React.ReactNode;
};

export default function ShowIfLoggedIn(props: ShowIfLoggedInProps) {
  const { isUserLoggedIN } = useAppContext();

  if (isUserLoggedIN) {
    return <>{props.element}</>;
  } else {
    return <Navigate to="/" replace />;
  }
}
