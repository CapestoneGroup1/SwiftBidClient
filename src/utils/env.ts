export const env = {
  serverBaseUrl: process.env.REACT_APP_SERVER_BASE_URL,
  routes: {
    login: "/login",
    signup: "/signup",
    forgotpassword: "/forgotpassword",
    logout: "/logout",
  },
  api: {
    login: "/auth/login",
    signup: "/auth/signup",
    forgotpassword: "/auth/forgotpassword",
    resetpassword: "/auth/resetpassword",
    profile: "/user/profile"
  },
};
