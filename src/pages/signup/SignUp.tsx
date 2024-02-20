import { ChangeEvent, useState } from "react";
import { useSignUp } from "../../api/auth";
import { env } from "../../utils/env";
import { Col, Container, Row, Stack } from "react-bootstrap";
import "./signup.css"; // Import the CSS file

export default function Signup() {
  const [state, setState] = useState({
    email: "",
    password: "",
    username: ""
  });
  const { postData, hasError, error, isLoading } = useSignUp();

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
    const { email, password, username } = state;
    postData({
      email,
      password,
      username
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
            
              <h1 className="text-center">Signup</h1>
              <form onSubmit={submitLoginForm}>
                <Stack gap={3}>
                  {hasError && error?.error && (
                    <div className="alert alert-danger error">
                      {error?.error || "Internal Server Error!!!"}
                    </div>
                  )}
                 <input
                      type="text"
                      name="username"
                      placeholder="UserName"
                      onChange={onChange}
                      maxLength={10}
                      required
                    className="form-input"

                    />
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
                      maxLength={8}
                      required
                    className="form-input"
                    />
                    <input type="submit" value="Sign Up" className="btn-signup"/>
                    <div className="d-flex justify-content-center">
                      <a href={env.routes.login}>Already have an account</a>
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
