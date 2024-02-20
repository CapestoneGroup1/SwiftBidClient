import { ChangeEvent, useEffect, useState } from "react";
import { useForgotPassword, useResetPassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { env } from "../../utils/env";
import { Col, Container, Row, Stack } from "react-bootstrap";
import "./forgot.css"; // Import the CSS file

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
    <div className="login-container">
      <Container>
        <div className="login-form">
          <Row className="justify-content-center align-items-center">
            {/* Image column */}
            <Col xs={12} md={6} className="image-column">
              <img src="/logo.png" alt="Login" className="img-fluid" />
            </Col>
            {/* Login form column */}
            <Col xs={12} md={6} className="login-form-column">
              <h1 className="text-center">Forgot Password</h1>
              {state.view === "FORGOT_PASSWORD" && (
                <div>
                  <form onSubmit={submitSendOtp}>
                    <Stack gap={3}>
                      {hasError && error?.error && (
                        <div className="alert alert-danger error">
                          {error?.error || "Internal Server Error!!!"}
                        </div>
                      )}
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={onChange}
                        required
                        className="form-input"
                      />
                      <input type="submit" value="Send OTP" className="btn-login" />
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
                        <div className="alert alert-danger error">
                          {resetErrorData?.error || "Internal Server Error!!!"}
                        </div>
                      )}
                      <input
                        type="number"
                        name="otp"
                        placeholder="OTP"
                        onChange={onChange}
                        required
                        className="form-input"
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={onChange}
                        required
                        className="form-input"
                      />
                      <input type="submit" value="ResetPassword" className="btn-login" />
                    </Stack>
                  </form>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
