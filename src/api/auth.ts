import { env } from "../utils/env";
import { useCustomMutation } from "../hooks/useCustomMutation";
import { useEffect } from "react";
import { useAppContext } from "../components/AppWrapper";
import { loginDispatchAction } from "../context/ActionCreators";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export const useLogin = () => {
  const { data, postData, hasError, error, isLoading } = useCustomMutation<
    LoginRequest,
    LoginResponse
  >(env.api.login);
  const { dispatch } = useAppContext();
  useEffect(() => {
    if (isLoading) return;
    if (!hasError && data?.token) {
      localStorage.setItem("token", data.token);
      dispatch(loginDispatchAction(data.token));
    }
  }, [data, hasError, error, isLoading, dispatch]);
  return { data, postData, hasError, error, isLoading };
};

type SignUpRequest = {
  email: string;
  password: string;
  username: string;
};

type SignUpResponse = {
  token: string;
};

export const useSignUp = () => {
  const { data, postData, hasError, error, isLoading } = useCustomMutation<
    SignUpRequest,
    SignUpResponse
  >(env.api.signup);
  const { dispatch } = useAppContext();
  useEffect(() => {
    if (isLoading) return;
    if (!hasError && data?.token) {
      localStorage.setItem("token", data.token);
      dispatch(loginDispatchAction(data.token));
    }
  }, [data, hasError, error, isLoading, dispatch]);
  return { data, postData, hasError, error, isLoading };
};

type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = {
  message: string;
};

export const useForgotPassword = () => {
  const { data, postData, hasError, error, isLoading } = useCustomMutation<
    ForgotPasswordRequest,
    ForgotPasswordResponse
  >(env.api.forgotpassword);
  return { data, postData, hasError, error, isLoading };
};

type ResetPasswordRequest = {
  email: string;
  password: string;
  otp: string;
};

type ResetPasswordResponse = {
  message: string;
};

export const useResetPassword = () => {
  const { data, postData, hasError, error, isLoading } = useCustomMutation<
    ResetPasswordRequest,
    ResetPasswordResponse
  >(env.api.resetpassword);
  return { data, postData, hasError, error, isLoading };
};
