import { AppDispatchAction, User } from "../utils/types";

export const loginDispatchAction = (token: string): AppDispatchAction => {
  return {
    type: "LOGIN",
    payload: {
      token,
    },
  };
};

export const profileDispatchAction = (user: User): AppDispatchAction => {
  return {
    type: "PROFILE",
    payload: {
      user,
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
