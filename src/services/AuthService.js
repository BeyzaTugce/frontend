import HttpService from "./HttpService";

export default class AuthService {
  static baseURL() {
    return "http://localhost:4000/auth";
  }

  static register(
    email,
    username,
    firstname,
    surname,
    password,
    phone,
    birthdate,
    registeredDate,
    gender,
    district,
    postcode,
    city,
    correspondenceAddress,
  ) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${AuthService.baseURL()}/register`,
        {
            email: email,
            username: username,
            firstname: firstname,
            surname: surname,
            password: password,
            phone: phone,
            birthdate: birthdate,
            registeredDate: registeredDate,
            gender: gender,
            district : district,
            postcode : postcode,
            city: city,
            correspondenceAddress: correspondenceAddress,
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
        `${AuthService.baseURL()}/login`,
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
