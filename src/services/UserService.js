import HttpService from "./HttpService";

export default class UserService{
    static baseURL() {
        return "http://localhost:4000/user";
    }

    static getUsers(){
        return new Promise(async (resolve, reject) => {
            await HttpService.get(
                this.baseURL(),
                function (data) {
                    resolve(data);
                },
                function (status) {
                    reject(status);
                });
        });
    }

    static getUser(id){
        return new Promise(async (resolve, reject) => {
            await HttpService.get(`${UserService.baseURL()}/${id}`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving user");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static deleteUser(user) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${UserService.baseURL()}/${user._id}`,
                function (data) {
                    if (data.message !== undefined) {
                        resolve(data.message);
                    } else {
                        reject("Error while deleting");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static updateUser(user) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${this.baseURL()}/${user._id}`,
                user,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }
}