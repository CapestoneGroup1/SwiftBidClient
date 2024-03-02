import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppWrapper";
import { env } from "../utils/env";

type HideIfLoggedINProps = {
  element: React.ReactNode;
};

export default function HideIfLoggedIN(props: HideIfLoggedINProps) {
  const { isUserLoggedIN } = useAppContext();

  if (!isUserLoggedIN) {
    return <>{props.element}</>;
  } else {
    return <Navigate to="/" replace />;
  }
}
