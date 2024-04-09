import { ChangeEvent, useState } from "react";
import { useGoogleLink, useSignUp } from "../../api/auth";
import { env } from "../../utils/env";
import {
  Container,
  Stack,
  TextField,
  Button,
  Link,
} from "@mui/material";
import AuthPagesWrapper from "../../components/common/AuthPagesWrapper";
import { handleGoogleSign } from "../../services/firebase";
import google from "../../assets/images/google.png";

export default function Signup() {
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { postData, hasError, error, isLoading } = useSignUp();
  const { loginSuccess } = useGoogleLink();

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
      username,
    });
  };

  const handleGoogleSignIN = async () => {
    const token = await handleGoogleSign();
    if (token) loginSuccess(token);
  };

  return (
    <AuthPagesWrapper title="SwiftBid SignUp">
      <Container maxWidth="sm">
        <form onSubmit={submitLoginForm}>
          <Stack spacing={3}>
            {hasError && error?.error && (
              <div className="alert alert-danger error">
                {error?.error || "Internal Server Error!!!"}
              </div>
            )}
            <TextField
              type="text"
              name="username"
              label="Username"
              variant="outlined"
              onChange={onChange}
              required
              fullWidth
            />
            <TextField
              type="email"
              name="email"
              label="Email"
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
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
            <div style={{ textAlign: "center" }}>
              <Link href={env.routes.login}>Already have an account</Link>
            </div>
            <div style={{ textAlign: "center" }} onClick={handleGoogleSignIN}>
              <img
                src={google}
                style={{
                  width: "10rem",
                  height: "auto",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                alt="Google SignIn"
              />
            </div>
          </Stack>
        </form>
      </Container>
    </AuthPagesWrapper>
  );
}
