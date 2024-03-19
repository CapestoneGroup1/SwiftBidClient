import { useEffect } from "react";
import { useCustomMutation } from "../hooks/useCustomMutation";
import useCustomNotifications from "../hooks/useCustomNotifications";
import { env } from "../utils/env";
import {
  Category,
  ProductDetails,
  ProfileUpdateData,
  User,
} from "../utils/types";
import useFetch from "../hooks/useFetch";

export interface UserWinnings {
  _id: string;
  userid: string;
  productid: ProductDetails;
  bidprice: string;
  date: string;
  paymentcompleted: boolean
}

export const useUpdateProfile = (successCallback: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<ProfileUpdateData, User>(env.api.updateProfile);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data && data) {
      success("Profile Updated Success");
      successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Update profile");
    }
  }, [data]);

  return { data, error, hasError, isLoading, postData };
};

export const useGetUserWinnings = () => {
  const { data, error, hasError, isLoading, refetch } = useFetch<UserWinnings[]>(
    env.api.userwinnings
  );
  return { data, error, hasError, isLoading, refetch };
};


export const useGetUserWishList = () => {
  const { data, error, hasError, isLoading, refetch } = useFetch<ProductDetails[]>(
    env.api.userwishlist
  );
  return { data, error, hasError, isLoading, refetch };
};
