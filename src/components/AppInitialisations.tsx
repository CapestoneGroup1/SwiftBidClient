import React, { useEffect } from "react";
import { useAppContext } from "./AppWrapper";
import {
  loginDispatchAction,
  logoutDispatchAction,
} from "../context/ActionCreators";

export default function AppInitialisations(props: {
  children: React.ReactNode;
}) {
  const { dispatch, token } = useAppContext();

  useEffect(() => {
    // validate Token from Backend.... TODO
    // TODO get prfile Details after API is ready and store in user objct inside context
    const tokenValue = localStorage.token || token;
    if (!tokenValue) {
      return dispatch(logoutDispatchAction());
    }
  }, [dispatch, token]);

  return <>{props.children}</>;
}
