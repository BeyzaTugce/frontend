import AdminService from "../../services/AdminService";

export function login(email, password) {
    function onSuccess(admin) {
        return { type: "LOGIN_SUCCESS", admin: admin };
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await AdminService.login(email, password);
            dispatch(onSuccess(resp.admin));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export function logout() {
    AdminService.logout();
    return { type: "LOGOUT" };
}

export function loginReset() {
    return { type: "LOGIN_RESET" };
}

export function register(email, password){
    function onSuccess(admin) {
        return { type: "LOGIN_SUCCESS", admin: admin };
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await AdminService.register(email, password);
            dispatch(onSuccess(resp.admin));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

