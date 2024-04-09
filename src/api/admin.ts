import { useEffect } from "react";
import { useCustomMutation } from "../hooks/useCustomMutation";
import useFetch from "../hooks/useFetch";
import { env } from "../utils/env";
import { Category, ProductBids, User } from "../utils/types";
import useCustomNotifications from "../hooks/useCustomNotifications";
import { useLazyFetch } from "../hooks/useLazyFetch";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: string;
  imageurl: string;
  category: Category;
  userid: User;
  adminapproval: "APPROVED" | "PENDING" | "REJECTED";
};

type ApproveRejectProduct = {
  id: string;
  rejectReason?: string;
};

type Query = {
  _id?: string
  name: string;
  email: string;
  message: string
  date?: string
};

type BidEndProducts = {
  product: Product;
  bids: ProductBids[];
};

type winners = {
  _id: string;
  userid: User;
  productid: Product;
  bidprice: number;
  date: string;
  paymentcompleted: boolean;
  transactionId: string;
};

export const usePendingApprovals = () => {
  const { data, error, hasError, isLoading, refetch } = useFetch<Product[]>(
    env.api.pendingapprovals
  );
  return { data, error, hasError, isLoading, refetch };
};

export const useApproveProduct = (successCallback: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<ApproveRejectProduct, Product>(env.api.approveproduct);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data && data._id) {
      success("Product Approved Success");
      successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Take Action");
    }
  }, [data, hasError]);

  return { data, error, hasError, isLoading, postData };
};

export const useRejectProduct = (successCallback: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<ApproveRejectProduct, Product>(env.api.rejectproduct);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data && data._id) {
      success("Product Approved Success");
      successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Take Action");
    }
  }, [data, hasError]);

  return { data, error, hasError, isLoading, postData };
};

export const useGetBidEndProducts = () => {
  const { data, error, hasError, isLoading, fetchData } =
    useLazyFetch<BidEndProducts[]>();
  return {
    data,
    error,
    hasError,
    isLoading,
    trigger: (bidenddate: string) => {
      fetchData(env.api.bidendproducts + "/" + bidenddate);
    },
  };
};

export const useDeclareWinners = (successCallback?: Function) => {
  const { data, error, hasError, isLoading, fetchData } =
    useLazyFetch<BidEndProducts[]>();
  return {
    data,
    error,
    hasError,
    isLoading,
    trigger: async (bidenddate: string) => {
      await fetchData(env.api.declarewinners + "/" + bidenddate);
      successCallback && successCallback();
    },
  };
};

export const useGetAllWinners = () => {
  const { data, error, hasError, isLoading, refetch } = useFetch<winners[]>(
    env.api.winners
  );
  return { data, error, hasError, isLoading, refetch };
};

export const useGetQueries = () => {
  const { data, error, hasError, isLoading, refetch } = useFetch<Query[]>(
    env.api.query
  );
  return { data, error, hasError, isLoading, refetch };
};


export const useSaveQuery = (successCallback: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<Query, Query>(env.api.query);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data) {
      success("Details Sent Successfully");
      successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Submit Details");
    }
  }, [data, hasError]);

  return { data, error, hasError, isLoading, postData };
};
