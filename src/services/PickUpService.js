import HttpService from "./HttpService";

export default class PickUpService{
    static baseURL() {
        return "http://localhost:4000/pickup";
    }

    static getPickUps(){
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

    static getPickUp(id){
        return new Promise(async (resolve, reject) => {
            await HttpService.get(`${PickUpService.baseURL()}/${id}`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving pick-up");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static deletePickUp(pickup) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${PickUpService.baseURL()}/${pickup._id}`,
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

    static updatePickUp(pickup) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${this.baseURL()}/${pickup._id}`,
                pickup,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static createPickUp(pickup){
        pickup.id = Math.floor(Math.random() * 100000000 + 1).toString();

        return new Promise((resolve, reject) => {
            HttpService.post(
                `${PickUpService.baseURL()}`,
                pickup,
                function (data){
                    resolve(data);
                },
                function (status){
                reject(status);
                });
        });
    }

}