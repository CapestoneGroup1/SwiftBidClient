import { useEffect, useState } from "react";
import APIService from "../services/Api";
import { ErrorResponse } from "../utils/types";
import { AxiosError } from "axios";

export const useFetch = <TData>(url: string, skip = false) => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [reFetchCount, reFetch] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (skip || !url) return;
      setIsLoading(true);
      setData(null);
      setHasError(false);
      setError(null);
      try {
        const response = await APIService.getInstance().get<TData>(url);
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
    fetchData();
  }, [skip, url, reFetchCount]);
  return { data, isLoading, hasError, error, refetch: () => reFetch(count => count + 1) };
};
export default useFetch;
