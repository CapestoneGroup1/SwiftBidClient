import React from "react";

export type AppWrapperProps = {
  children: React.ReactNode;
};

export type User = {
  id: string;
  username: string;
  email: string;
  mobile: string;
  address: string;
  role: string;
  password: string;
  province: string;
  city: string;
  postalcode: string;
  country: string;
};

export interface AppContextState {
  isUserLoggedIN: boolean;
  user: User;
  token: string;
}

export type AppActionTypes = "LOGIN" | "LOGOUT" | "USER_PROFILE" | "PROFILE";
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
  error: string;
};

export type Category = {
  _id: string,
  name: string
}
export type ProductDetails = {
  _id: string;
  name: string;
  description: string;
  price: string;
  imageurl: string;
  category: string;
  userid: string;
  adminapproval: "APPROVED" | "PENDING" | "REJECTED";
};