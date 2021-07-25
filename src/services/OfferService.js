import HttpService from "./HttpService";

export default class OfferService {
  static baseURL() {
    return "http://localhost:4000/bargain";
  }


  static getOffer(id) {
    return new Promise(async (resolve, reject) => {
      await HttpService.get(
        `${OfferService.baseURL()}/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving offer");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }


  
  static createOffer(id, offer) {

    return new Promise((resolve, reject) => {
      HttpService.post(
        `${OfferService.baseURL()}/${id}`,
        offer,
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
