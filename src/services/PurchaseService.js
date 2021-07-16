import HttpService from "./HttpService";

export default class PurchaseService {
  static baseURL() {
    return "http://localhost:4000/purchase";
  }

  static getPurchases() {
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

  static getPurchase(id) {
    return new Promise(async (resolve, reject) => {
      await HttpService.get(
        `${PurchaseService.baseURL()}/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving purchase");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deletePurchase(purchase) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${PurchaseService.baseURL()}/${purchase._id}`,
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

  static updatePurchase(purchase) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${purchase._id}`,
        purchase,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createPurchase(purchase) {
    purchase.id = Math.floor(Math.random() * 100000000 + 1).toString();

    return new Promise((resolve, reject) => {
      HttpService.post(
        `${PurchaseService.baseURL()}`,
        purchase,
        function (data) {
          resolve(data);
        },
        function (status) {
          reject(status);
        }
      );
    });
  }
}
