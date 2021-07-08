import HttpService from "./HttpService";
import ItemService from "./ItemService";

export default class OrderService {
    static baseURL() {
        return "http://localhost:4000/order";
    }
    static baseURLItem() {
        return "http://localhost:4000/item";
    }

    static getOrders() {
        return new Promise(async (resolve, reject) => {
            await HttpService.get(
                this.baseURL(),
                function (data) {
                    resolve(data);
                },
                function (status) {
                    reject(status);
                }
            );
        });
    }

    static getOrder(id) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${OrderService.baseURL()}/${id}`,
                function (data) {

                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving order");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static deleteOrder(order) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${OrderService.baseURL()}/${order._id}`,
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

    static updateOrder(order) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${this.baseURL()}/${order._id}`,
                order,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static createOrder(order) {
        order.id = Math.floor(Math.random() * 100000000 + 1).toString();

        return new Promise((resolve, reject) => {
            HttpService.post(
                `${OrderService.baseURL()}`,
                order,
                function (data) {
                    resolve(data);
                },
                function (status) {
                    reject(status);
                }
            );
        });
    }

    //TODO: Update item and seller operations
    static readItems(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${OrderService.baseURL()}/item/${id}`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
            console.log("ORDERSERVICE:"+OrderService.baseURL()+"/item/"+id);
        });
    }

    static readSeller(garageId) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${OrderService.baseURL()}/seller/${orderId}`,
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
