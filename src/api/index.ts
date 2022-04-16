import axios from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_URL
})

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $authHost,
    $host
}