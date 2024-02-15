import { ChangeEvent, useState } from "react";
import { useSignUp } from "../../api/auth";
import { env } from "../../utils/env";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";

export default function SignUp() {
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { postData, hasError, error, isLoading } = useSignUp();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitSignUpForm = (e: any) => {
    if (isLoading) return;
    e.preventDefault();
    const { email, password, username } = state;
    postData({
      email,
      password,
      username,
    });
  };

  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col xs={12} md={6}>
            logo
          </Col>
          <Col xs={12} md={6}>
            <Card
              bg={"light"}
              key={"light"}
              text={"dark"}
              style={{ width: "100%" }}
              className="mb-2"
            >
              <Card.Header>SIGN UP</Card.Header>
              <Card.Body>
                <form onSubmit={submitSignUpForm}>
                  <Stack gap={3}>
                    {hasError && error?.error && (
                      <div className="error">
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
                    />
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
                    <input type="submit" value="Sign Up" />
                    <div className="d-flex justify-content-center">
                      <a href={env.routes.login}>Already have an account</a>
                    </div>
                  </Stack>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
