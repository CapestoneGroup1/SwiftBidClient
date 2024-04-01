import { ChangeEvent, useState } from "react";
import { useGoogleLink, useLogin } from "../../api/auth";
import { env } from "../../utils/env";
import { Stack, TextField, Button, Link } from "@mui/material";
import AuthPagesWrapper from "../../components/common/AuthPagesWrapper";
import google from "../../assets/images/google.png";
import { handleGoogleSign } from "../../services/firebase";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { postData, hasError, error, isLoading } = useLogin();
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
    const { email, password } = state;
    postData({
      email,
      password,
    });
  };

  const handleGoogleSignIN = async () => {
    const token = await handleGoogleSign();
    if (token) loginSuccess(token);
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
