import { useEffect } from "react";
import { useCustomMutation } from "../hooks/useCustomMutation";
import useFetch from "../hooks/useFetch";
import { env } from "../utils/env";
import { Category, User } from "../utils/types";
import useCustomNotifications from "../hooks/useCustomNotifications";

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
      successCallback()
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
      successCallback()
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Take Action");
    }
  }, [data]);

  return { data, error, hasError, isLoading, postData };
};
