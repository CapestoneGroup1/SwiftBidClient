import React from "react";

export type AppWrapperProps = {
  children: React.ReactNode;
};

export type User = {
  username: string;
  email: string;
};

export interface AppContextState {
  isUserLoggedIN: boolean;
  user: User;
  token: string;
}

export type AppActionTypes = "LOGIN" | "LOGOUT" | "USER_PROFILE";
export type ContextPayload = {
  user?: User;
  token?: string;
};

export type AppDispatchAction = {
  type: AppActionTypes;
  payload: ContextPayload;
};

export interface AppContext extends AppContextState {
  dispatch: React.Dispatch<AppDispatchAction>;
}

export type ErrorResponse = {
    error: string
}