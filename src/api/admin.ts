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

type BidEndProducts = {
  product: Product;
  bids: ProductBids[];
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
  }, [data]);

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
  }, [data]);

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
      fetchData(env.api.bidendproducts + "/" + bidenddate)
    }
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
