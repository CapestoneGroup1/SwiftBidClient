import { ChangeEvent, useState } from "react";
import { useLogin } from "../../api/auth";
import { env } from "../../utils/env";
import {
  Stack,
  TextField,
  Button,
  Link,
} from "@mui/material";
import AuthPagesWrapper from "../../components/common/AuthPagesWrapper";

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
    <>
      <AuthPagesWrapper title="SwiftBid Login">
        <form onSubmit={submitLoginForm}>
          <Stack spacing={3}>
            {hasError && error?.error && (
              <div className="alert alert-danger error">
                {error?.error || "Internal Server Error!!!"}
              </div>
            )}
            <TextField
              type="email"
              name="email"
              placeholder="Email"
              onChange={onChange}
              required
              fullWidth
            />
            <TextField
              type="password"
              name="password"
              placeholder="Password"
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
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div style={{ textAlign: "center" }}>
              <Link href={env.routes.forgotpassword}>Forgot Password?</Link>
            </div>
            <div style={{ textAlign: "center" }}>
              <Link href={env.routes.signup}>Create an account</Link>
            </div>
          </Stack>
        </form>
      </AuthPagesWrapper>
    </>
  );
}
