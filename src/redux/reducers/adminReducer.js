const getAdmin = () => {
  if (window.localStorage["jwtToken"]) {
    let token = window.localStorage["jwtToken"];
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let adminJson = JSON.parse(window.atob(base64));
    // if token is expired delete it and return {}
    // --> User is not logged in anymore.
    if (adminJson.exp > Date.now()) {
      window.localStorage.removeItem("jwtToken");
      return {};
    }
    return {
      admin: {
        _id: adminJson._id,
        email: adminJson.email,
        password: adminJson.password,
      },
    };
  }
  return {};
};

export default function admin(state = getAdmin(), action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { admin: action.admin };
    case "LOGIN_FAILURE":
      return { error: "Password or username incorrect." };
    case "LOGIN_RESET":
      return {};
    case "LOGOUT":
      return {};
    default:
      return state;
  }
}
