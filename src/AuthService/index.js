import axios from 'axios';

export default class AuthService {
    constructor(domain) {
        this.domain =
            domain || 'http://139.180.203.181:5000/api/schedule';
    }

    login = (studentAccount, studentPassword) => {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const urlencoded = new URLSearchParams();
        urlencoded.append('studentAccount', studentAccount);
        urlencoded.append('studentPassword', studentPassword);

        const requestOptions = {
            header: headers,
            method: 'POST',
            data: urlencoded,
            redirect: 'follow',
        };

        return axios(`${this.domain}/guest`, requestOptions).then((res) => {
            return Promise.resolve(res);
        });
    };
}
