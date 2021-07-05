import HttpService from "./HttpService";

export default class AdminService {
  static baseURL() {
    return "http://localhost:4000/auth";
  }

  static register(mail, pass) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${AdminService.baseURL()}/register`,
        {
          email: mail,
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

  static login(mail, pass) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${AdminService.baseURL()}/login`,
        {
          email: mail,
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
