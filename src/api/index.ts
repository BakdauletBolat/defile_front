import axios from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_URL,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken',
    withCredentials: true
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_URL
})


$authHost.interceptors.request.use(
    async config => {
            const token = localStorage.getItem('token');

        if (token !== null) {
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        }
                   
        return config;
    },
    error => {
        Promise.reject(error)
    });



export {
    $authHost,
    $host
}