import React, { useEffect } from "react";
import { useAppContext } from "./AppWrapper";
import {
  loginDispatchAction,
  logoutDispatchAction,
  profileDispatchAction,
} from "../context/ActionCreators";
import APIService from "../services/Api";
import { env } from "../utils/env";
import { User } from "../utils/types";

export default function AppInitialisations(props: {
  children: React.ReactNode;
}) {
  const { dispatch, token } = useAppContext();

  useEffect(() => {
    // Get profile Details after receiving token after signup/login/page refresh.
    const getUserProfile = async (tokenValue: string) => {
      try {
        const response = await APIService.getInstance().get<User>(
          env.api.profile
        );
        if (response.status === 200) {
          dispatch(profileDispatchAction(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    /**
     * Check token on every page refresh.
     */
    const tokenValue = localStorage.token || token;
    if (!tokenValue) {
      return dispatch(logoutDispatchAction());
    }
    dispatch(loginDispatchAction(tokenValue));
    getUserProfile(tokenValue);
  }, [dispatch, token]);

  return <>{props.children}</>;
}
