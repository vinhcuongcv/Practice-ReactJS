import axios from "axios"

const instance = axios.create({
    baseURL: 'https://reqres.in'
});

// Add a request interceptor
instance.interceptors.response.use(function (response) {
    // Do something before request is sent
    return response.data ? response.data : { statusCode: response.status };
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
export default instance;