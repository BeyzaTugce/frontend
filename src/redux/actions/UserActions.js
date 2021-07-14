import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";

export function login(email, password) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "LOGIN_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await AuthService.login(email, password);
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function logout() {
  AuthService.logout();
  return { type: "LOGOUT" };
}

export function loginReset() {
  return { type: "LOGIN_RESET" };
}

export function register(
  email,
  username,
  firstname,
  surname,
  password,
  phone,
  birthdate,
  registeredDate,
  gender,
  district,
  postcode,
  city,
  correspondenceAddress,
) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "LOGIN_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await AuthService.register(
          email,
          username,
          firstname,
          surname,
          password,
          phone,
          birthdate,
          registeredDate,
          gender,
          district,
          postcode,
          city,
          correspondenceAddress,
      );
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function getUsers() {
  function onSuccess(users) {
    return { type: "GETUSERS_SUCCESS", users: users };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    console.log("failed to get the users", error);
  }
  return async (dispatch) => {
    try {
      let users = await UserService.getUsers();
      dispatch(onSuccess(users));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function deleteUser(user) {
  function onSuccess(users) {
    return { type: "DELETEUSER_SUCCESS", users: users };
  }
  function onFailure(error) {
    console.log("delete user failure", error);
  }

  return async (dispatch) => {
    try {
      await AuthService.deleteUser(user);
      let users = await AuthService.getUsers();
      dispatch(onSuccess(users));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function changeUser(changedUser) {
  function onSuccess(user) {
    return { type: "UPDATEUSER_SUCCESS", user: user };
  }
  function onFailure(error) {
    console.log("change user failure", error);
  }

  return async (dispatch) => {
    try {
      let user = await AuthService.updateUser(changedUser);
      dispatch(onSuccess(user));
    } catch (e) {
      onFailure(e);
    }
  };
}

export const getUser = (id) => {
  function onSuccess(user) {
    return { type: "GETUSER_SUCCESS", user: user };
  }
  function onFailure(error) {
    console.log("failed to load a user", error);
  }

  return async (dispatch, getState) => {
    try {
      let user = await AuthService.getUser(id);
      dispatch(onSuccess(user));
    } catch (e) {
      onFailure(e);
    }
  };
};
