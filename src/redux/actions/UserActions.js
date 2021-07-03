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
            let resp = await UserService.login(email, password);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export function logout() {
    UserService.logout();
    return { type: "LOGOUT" };
}

export function loginReset() {
    return { type: "LOGIN_RESET" };
}

export function register(email,username, firstname, surname, password, phone, birthdate,registeredDate){
    function onSuccess(user) {
        return { type: "LOGIN_SUCCESS", user: user };
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.register(email,username, firstname, surname, password, phone, birthdate,registeredDate);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

