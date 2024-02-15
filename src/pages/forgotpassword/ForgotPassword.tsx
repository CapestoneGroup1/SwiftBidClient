import { ChangeEvent, useEffect, useState } from "react";
import { useForgotPassword, useResetPassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { env } from "../../utils/env";
import { Col, Container, Row, Stack } from "react-bootstrap";

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
    <>
      <Container>
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col xs={12} md={6}>
            logo
          </Col>
          <Col xs={12} md={6}>
            {state.view === "FORGOT_PASSWORD" && (
              <div>
                <form onSubmit={submitSendOtp}>
                  <Stack gap={3}>
                    {hasError && error?.error && (
                      <div className="error">
                        {error?.error || "Internal Server Error!!!"}
                      </div>
                    )}
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={onChange}
                      required
                    />
                    <input type="submit" value="Send OTP" />
                    <a href={env.routes.login}>Back to Login</a>
                  </Stack>
                </form>
              </div>
            )}
            {state.view === "RESET_PASSWORD" && (
              <div>
                <form onSubmit={submitResetPassword}>
                  <Stack gap={3}>
                    {resetError && resetErrorData?.error && (
                      <div className="error">
                        {resetErrorData?.error || "Internal Server Error!!!"}
                      </div>
                    )}
                    <input
                      type="number"
                      name="otp"
                      placeholder="OTP"
                      onChange={onChange}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={onChange}
                      required
                    />
                    <input type="submit" value="ResetPassword" />
                  </Stack>
                </form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
