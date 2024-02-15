import React, { useEffect } from "react";
import { useAppContext } from "../../components/AppWrapper";
import { logoutDispatchAction } from "../../context/ActionCreators";
import { useNavigate } from "react-router-dom";
import { env } from "../../utils/env";

export default function Logout() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logoutDispatchAction());
    navigate(env.routes.login);
  }, []);
  return <></>;
}
