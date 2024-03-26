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
  primaryCard: string
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

export type PRODUCT_STATUS  =  'APPROVED' | 'PENDING' | 'REJECTED' | 'SOLD' | 'EXPIRED'

export type ProductDetails = {
  _id: string;
  name: string;
  description: string;
  price: string;
  imageurl: string;
  category: string;
  userid: string;
  bidenddate: string;
  adminapproval: PRODUCT_STATUS;
};

export type ProductBids = {
  _id: string
  userid: User
  productid: ProductDetails
  bidprice: number
  date: string
}

export type NewBid = {
  productid: string,
  bidprice: number
}
export interface ProfileUpdateData {
  username: string;
  email: string;
  mobile: string;
  address: string;
  province: string;
  city: string;
  postalcode: string;
  country: string;
}
