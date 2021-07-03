import HttpService from "./HttpService";

export default class UserService {
    static baseURL() {
        return "http://localhost:4000/auth";
    }

    static register(email,username, firstname, surname, password, phone, birthdate,registeredDate) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/register`,
                {
                    email: email,
                    username:username,
                     firstname:firstname,
                      surname:surname,
                       password:password, 
                       phone:phone, 
                       birthdate:birthdate,
                       registeredDate:registeredDate,
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static login(email, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/login`,
                {
                    email: email,
                    password: pass,
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static logout() {
        window.localStorage.removeItem("jwtToken");
    }
}