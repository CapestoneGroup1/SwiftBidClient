import { ChangeEvent, useState } from "react";
import { useLogin } from "../../api/auth";
import { env } from "../../utils/env";
import { Col, Container, Row, Stack } from "react-bootstrap";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { postData, hasError, error, isLoading } = useLogin();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitLoginForm = (e: any) => {
    if (isLoading) return;
    e.preventDefault();
    const { email, password } = state;
    postData({
      email,
      password,
    });
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col xs={12} md={6}>
          logo
        </Col>
        <Col xs={12} md={6}>
          <form onSubmit={submitLoginForm}>
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
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
                maxLength={8}
                required
              />
              <input type="submit" value="Login" />
              <div className="d-flex justify-content-center">
                <a href={env.routes.forgotpassword}>Forgot Password?</a>
              </div>
              <div className="d-flex justify-content-center">
                <a href={env.routes.signup}>Create an account</a>
              </div>
            </Stack>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
