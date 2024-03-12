import { ChangeEvent, useState } from "react";
import { useLogin } from "../../api/auth";
import { env } from "../../utils/env";
import { Col, Container, Row, Stack } from "react-bootstrap";
import "./login.css"; // Import the CSS file

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
              <h1 className="text-center">Login</h1>
              <form onSubmit={submitLoginForm}>
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
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}
                    required
                    className="form-input"
                  />
                  <input type="submit" value="Login" className="btn-login" disabled={isLoading}/>
                  <div className="d-flex justify-content-center forgotpass">
                    <a href={env.routes.forgotpassword}>Forgot Password?</a>
                  </div>
                  <div className="d-flex justify-content-center">
                    <a href={env.routes.signup}>Create an account</a>
                  </div>
                </Stack>
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
