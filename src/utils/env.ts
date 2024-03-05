export const env = {
  serverBaseUrl: process.env.REACT_APP_SERVER_BASE_URL,
  routes: {
    login: "/login",
    signup: "/signup",
    forgotpassword: "/forgotpassword",
    logout: "/logout",
    admin: "admin/",
    home: "/",
    addproduct: "/addproduct"
  },
  api: {
    login: "/auth/login",
    signup: "/auth/signup",
    forgotpassword: "/auth/forgotpassword",
    resetpassword: "/auth/resetpassword",
    profile: "/user/profile",
    pendingapprovals: "/product/pendingapproval",
    approveproduct: "/product/approveproduct",
    rejectproduct: "/product/rejectproduct",
    categories: "/category",
    addproduct: "/product/add"
  },
};