import { useState } from "react";
import React from "react";
import APIService from "../services/Api";
import { ErrorResponse } from "../utils/types";
import { AxiosError } from "axios";

export const useLazyFetch = (url: string, skip = false) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const fetchData = async () => {
    if (skip) return;
    setIsLoading(true);
    try {
      const response = await APIService.getInstance().get(url);
      if (`${response.status}`.startsWith("2")) {
        setData(response.data);
        setHasError(false);
        setError(null);
      } else {
        setHasError(true);
      }
      setIsLoading(false);
    } catch (err: any) {
      const errorObject = err as AxiosError;
      setHasError(true);
      setError(errorObject?.response?.data as ErrorResponse);
      setIsLoading(false);
      setData(null);
    }
  };

  return { data, isLoading, hasError, error, fetchData };
};
