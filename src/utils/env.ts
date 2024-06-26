export const env = {
  serverBaseUrl: process.env.REACT_APP_SERVER_BASE_URL,
  routes: {
    login: "/login",
    signup: "/signup",
    forgotpassword: "/forgotpassword",
    logout: "/logout",
    admin: "admin/",
    decalrewinners: "/decalrewinners",
    winners: "/winners",
    queries: "/queries",
    home: "/",
    addproduct: "/addproduct",
    categories: "/categories",
    myproducts: "/myproducts",
    winnings: "/winnings",
    wishlist: "/wishlist",
    productinfo: "/productinfo/:productid",
    allproducts: "/allproducts",
    userprofile: "/profile",
    savedcards: "/savedcards",
    contact: "/contact"
  },
  api: {
    login: "/auth/login",
    signup: "/auth/signup",
    forgotpassword: "/auth/forgotpassword",
    resetpassword: "/auth/resetpassword",
    profile: "/user/profile",
    pendingapprovals: "/admin/product/pendingapproval",
    winners: "/admin/winners",
    approveproduct: "/admin/product/approveproduct",
    rejectproduct: "/admin/product/rejectproduct",
    query: "/admin/support",
    categories: "/category",
    addcategory: "/category/add",
    editcategory: "/category/edit",
    addproduct: "/product/add",
    useruploadedproducts: "/product/userId",
    productdetailsbyid: "/product/details",
    productBids: "/bids/product",
    placenewbid: "/bids",
    allproducts: "/product",
    updateProfile: "/user/profile",
    bidendproducts: "/admin/product/bidend",
    declarewinners: "/admin/product/declarewinners",
    userwinnings: "/user/winnings",
    userwishlist: "/user/wishlist",
    addnewcard: "/user/addnewcard",
    savedcards: "/user/savedcards",
    setprimary: "/user/setprimarycard",
    deletecard: "/user/deletecard",
  },
};
