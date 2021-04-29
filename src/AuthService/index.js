import axios from "axios";

export default class AuthService {
  constructor(domain) {
    this.domain = domain || "https://tkbkma.herokuapp.com/api/schedule/guest";
  }

  login = (studentAccount, studentPassword) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("studentAccount", studentAccount);
    urlencoded.append("studentPassword", studentPassword);
    return axios.post(`${this.domain}`, urlencoded).then((res) => {
      return Promise.resolve(res);
    });
  };
}
