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
import { useLazyFetch } from "../hooks/useLazyFetch";

export interface UserWinnings {
  _id: string;
  userid: string;
  productid: ProductDetails;
  bidprice: string;
  date: string;
  paymentcompleted: boolean;
  transactionId: string
}
export interface AddNewCreditCard {
  name: string;
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  address_country: string;
  address_zip: string;
  testCardToken?: string;
}
export interface CardDetails {
  cardId: string;
  number: string;
  exp_month: number;
  exp_year: number;
  name: string;
  brand: string;
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
  }, [data, hasError]);

  return { data, error, hasError, isLoading, postData };
};

export const useGetUserWinnings = () => {
  const { data, error, hasError, isLoading, refetch } = useFetch<
    UserWinnings[]
  >(env.api.userwinnings);
  return { data, error, hasError, isLoading, refetch };
};


export const useGetProfile = () => {
  const { data, error, hasError, isLoading, fetchData } = useLazyFetch<
    User
  >(env.api.profile);
  return { data, error, hasError, isLoading, fetchData };
};

export const useGetUserWishList = () => {
  const { data, error, hasError, isLoading, refetch } = useFetch<
    ProductDetails[]
  >(env.api.userwishlist);
  return { data, error, hasError, isLoading, refetch };
};

export const useGetUserSavedCards = () => {
  const { data, error, hasError, isLoading, refetch } = useFetch<CardDetails[]>(
    env.api.savedcards
  );
  return { data, error, hasError, isLoading, refetch };
};

export const useAddNewCard = (successCallback?: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<AddNewCreditCard, CardDetails>(env.api.addnewcard);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data && data.cardId) {
      success("New Card Addedd Successfully");
      successCallback && successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Save Card Details");
    }
  }, [data, hasError]);

  return { data, error, hasError, isLoading, postData };
};

export const useSetCardAsPrimary = (successCallback?: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<any, { cardId: string }>(env.api.setprimary);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data && data.cardId) {
      success("Active Cart has been Reset Successfully.");
      successCallback && successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Reset Active Card");
    }
  }, [data, hasError]);

  return { data, error, hasError, isLoading, postData };
};


export const useDeleteCard = (successCallback?: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<any, { cardId: string }>(env.api.deletecard);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data && data.cardId) {
      success("Card Has been Deleted Successfully");
      successCallback && successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Reset Active Card");
    }
  }, [data, hasError]);

  return { data, error, hasError, isLoading, postData };
};
export const getProvinceNames = async () => {
  try {
    const response = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-canada-province/records?select=prov_name_en&limit=50');
    
    if (!response.ok) {
      throw new Error('Failed to fetch province data');
    }
    
    const data = await response.json();
    
  
    const provinceNames = data.results.map((result: { prov_name_en: any[]; }) => result.prov_name_en[0]);
    
    return provinceNames;
  } catch (error) {
    console.error('Error fetching province names:', error);
    return []; 
  }
};
