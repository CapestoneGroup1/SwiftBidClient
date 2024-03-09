export const env = {
  serverBaseUrl: process.env.REACT_APP_SERVER_BASE_URL,
  routes: {
    login: "/login",
    signup: "/signup",
    forgotpassword: "/forgotpassword",
    logout: "/logout",
    admin: "admin/",
    home: "/",
    addproduct: "/addproduct",
    categories: "/categories"
  },
  api: {
    login: "/auth/login",
    signup: "/auth/signup",
    forgotpassword: "/auth/forgotpassword",
    resetpassword: "/auth/resetpassword",
    profile: "/user/profile",
    pendingapprovals: "/product/pendingapproval",
    approveproduct: "/admin/product/approveproduct",
    rejectproduct: "/admin/product/rejectproduct",
    categories: "/category",
    addcategory: "/category/add",
    editcategory: "/category/edit",
    addproduct: "/product/add",
  },
};