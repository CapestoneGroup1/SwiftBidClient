import { ChangeEvent, useEffect, useState } from "react";
import { useForgotPassword, useResetPassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { env } from "../../utils/env";
import {
  Container,
  Stack,
  TextField,
  Button,
  Link,
  Typography,
} from "@mui/material";
import AuthPagesWrapper from "../../components/common/AuthPagesWrapper";

export default function ForgotPassword() {
  const [state, setState] = useState({
    email: "",
    password: "",
    otp: "",
    view: "FORGOT_PASSWORD",
  });
  const { postData, hasError, error, isLoading, data } = useForgotPassword();
  const {
    postData: resetPasswordAPI,
    hasError: resetError,
    error: resetErrorData,
    isLoading: resetLoading,
    data: resetData,
  } = useResetPassword();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!hasError && data?.message) {
      setState({ ...state, view: "RESET_PASSWORD" });
    }
  }, [data, hasError, error, isLoading]);

  useEffect(() => {
    if (resetLoading) return;
    if (!resetError && resetData?.message) {
      alert(resetData?.message);
      navigate(env.routes.login);
    }
  }, [navigate, resetData, resetError, resetErrorData, resetLoading]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitSendOtp = (e: any) => {
    if (isLoading) return;
    e.preventDefault();
    const { email } = state;
    postData({
      email,
    });
  };

  const submitResetPassword = (e: any) => {
    if (resetLoading) return;
    e.preventDefault();
    const { email, password, otp } = state;
    resetPasswordAPI({
      email,
      otp,
      password,
    });
  };

  return (
    <AuthPagesWrapper title="Reset Password">
      {state.view === "FORGOT_PASSWORD" && (
        <Container maxWidth="sm">
          <form onSubmit={submitSendOtp}>
            <Stack spacing={3}>
              {hasError && error?.error && (
                <Typography variant="body1" color="error">
                  {error?.error || "Internal Server Error!!!"}
                </Typography>
              )}
              <TextField
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={onChange}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
              <Link href={env.routes.login}>Back to Login</Link>
            </Stack>
          </form>
        </Container>
      )}
      {state.view === "RESET_PASSWORD" && (
        <Container maxWidth="sm">
          <Typography color='green'>OTP has been sent to {state.email}</Typography><br/>
          <form onSubmit={submitResetPassword}>
            <Stack spacing={3}>
              {resetError && resetErrorData?.error && (
                <Typography variant="body1" color="error">
                  {resetErrorData?.error || "Internal Server Error!!!"}
                </Typography>
              )}
              <TextField
                type="number"
                name="otp"
                label="OTP"
                variant="outlined"
                onChange={onChange}
                required
                fullWidth
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                onChange={onChange}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={resetLoading}
                fullWidth
              >
                {resetLoading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </Stack>
          </form>
        </Container>
      )}
    </AuthPagesWrapper>
  );
}
