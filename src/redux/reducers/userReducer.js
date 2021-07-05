const getUser = () => {
  if (window.localStorage["jwtToken"]) {
    let token = window.localStorage["jwtToken"];
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let userJson = JSON.parse(window.atob(base64));
    // if token is expired delete it and return {}
    // --> User is not logged in anymore.
    if (userJson.exp > Date.now()) {
      window.localStorage.removeItem("jwtToken");
      return {};
    }
    return {
      user: {
        _id: userJson._id,
        email: userJson.email,
        username: userJson.username,
        firstname: userJson.firstname,
        surname: userJson.surname,
        password: userJson.password,
        phone: userJson.phone,
        birthdate: userJson.birthdate,
        registeredDate: userJson.registeredDate,
      },
    };
  }
  return {};
};

export default function user(state = getUser(), action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.user };
    case "LOGIN_FAILURE":
      return { error: "Password or username incorrect." };
    case "LOGIN_RESET":
      return {};
    case "LOGOUT":
      return {};
    case "GETUSERS_SUCCESS":
      return { users: action.users };
    case "DELETEUSER_SUCCESS":
      return { users: action.users };
    case "UPDATEUSER_SUCCESS":
      return { user: action.user };
    case "GETUSER_SUCCESS":
      return { user: action.user };
    default:
      return state;
  }
}
