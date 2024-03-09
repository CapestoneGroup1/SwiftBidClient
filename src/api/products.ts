import { useEffect } from "react";
import { useCustomMutation } from "../hooks/useCustomMutation";
import useCustomNotifications from "../hooks/useCustomNotifications";
import useFetch from "../hooks/useFetch";
import { env } from "../utils/env";
import { Category, ProductDetails } from "../utils/types";

export const useGetCategories = () => {
  const { data, error, hasError, isLoading, refetch } = useFetch<Category[]>(
    env.api.categories
  );
  return { data, error, hasError, isLoading, refetch };
};

export const useAddNewProduct = (successCallback: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<FormData, ProductDetails>(env.api.addproduct);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data && data._id) {
      success("Product Added Success");
      successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Add Product");
    }
  }, [data]);

  return { data, error, hasError, isLoading, postData };
};

export const useAddNewCategory = (successCallback: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<{ name: string }, Category>(env.api.addcategory);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data && data._id) {
      success("Category Added Success");
      successCallback && successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Add Category");
    }
  }, [data]);

  return { data, error, hasError, isLoading, postData };
};


export const useEditCategory = (successCallback: Function) => {
  const {
    data,
    error: errorMessage,
    hasError,
    isLoading,
    postData,
  } = useCustomMutation<{ name: string, id: string }, Category>(env.api.editcategory);
  const { success, error } = useCustomNotifications();

  useEffect(() => {
    if (data && data._id) {
      success("Category Edited Success");
      successCallback && successCallback();
    } else if (hasError) {
      error(errorMessage?.error || "Failed to Edit Category");
    }
  }, [data]);

  return { data, error, hasError, isLoading, postData };
};
