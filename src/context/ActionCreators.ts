import { AppDispatchAction } from "../utils/types";

export const loginDispatchAction = (token: string): AppDispatchAction => {
  return {
    type: "LOGIN",
    payload: {
      token,
    },
  };
};

export const logoutDispatchAction = (): AppDispatchAction => {
  return {
    type: "LOGOUT",
    payload: {
      token: "",
    },
  };
};
