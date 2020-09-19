import axios from 'axios';

export default class AuthService {
    constructor(domain) {
        this.domain =
            domain || 'http://167.179.115.162:5000/api/schedule/guest';
        this.proxy = "https://cors-anywhere.herokuapp.com/";
    }

    login = (studentAccount, studentPassword) => {
        const urlencoded = new URLSearchParams();
        urlencoded.append('studentAccount', studentAccount);
        urlencoded.append('studentPassword', studentPassword);
        return axios.post(`${this.proxy + this.domain}`, urlencoded).then((res) => {
            return Promise.resolve(res);
        });
    };
}
