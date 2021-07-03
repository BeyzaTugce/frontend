import HttpService from "./HttpService";


export default class ItemService{
    static baseURL() {
        return "http://localhost:4000/item";
    }

    static getItems(){
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

    static getItem(id){
        return new Promise(async (resolve, reject) => {
            await HttpService.get(`${ItemService.baseURL()}/${id}`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving Item");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static deleteItem(Item) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${ItemService.baseURL()}/${Item._id}`,
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

    static updateItem(Item) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${this.baseURL()}/${Item._id}`,
                Item,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static createItem(Item){
        Item.id = Math.floor(Math.random() * 100000000 + 1).toString();

        return new Promise((resolve, reject) => {
            HttpService.post(
                ItemService.baseURL(),
                Item,
                function (data){
                    resolve(data);
                },
                function (status){
                    reject(status);
                });
        });
    }
}