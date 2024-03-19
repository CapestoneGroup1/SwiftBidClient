import { useState } from "react";
import React from "react";
import APIService from "../services/Api";
import { ErrorResponse } from "../utils/types";
import { AxiosError } from "axios";

export const useLazyFetch = <TData>(url = '', skip = false) => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const fetchData = async (localUrl?: string) => {
    if (skip || !(localUrl || url)) return;
    setIsLoading(true);
    setData(null);
    setHasError(false);
    setError(null);
    try {
      const response = await APIService.getInstance().get<TData>(localUrl || url);
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
