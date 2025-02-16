import axios from 'axios';
import { Platform } from 'react-native';

const commonConfigs = {
    baseURL: 'https://67af69f1dffcd88a67869bf9.mockapi.io',
    timeout: 10000,
    headers: {
    buildversion: '1.0.0',
    buildnumber: '1',
    platform: Platform.OS,
    },
    };
const instance = axios.create(commonConfigs);

instance.interceptors.response.use(
    (response) => response, 
    (error) => {
        const { data, status } = error.response || {};
        switch (status) {
            case 401:
                console.log('Unauthorized');
                break;
            case 403:
                console.log('Forbidden');
                break;
            case 404:
                console.log('Not Found');
                break;
            case 500:
                console.log('Internal Server Error');
                break;
            default:
                console.log('Unknown Error');
        }
        return Promise.reject(error);
    }
);


const responseBody = response => response.data;
const responseError = response => ({
    isError: true,
    message: response,
});

export const api = {
    get: (url, config) =>
    instance.get(url, config).then(responseBody).catch(responseError),
    post: (url, body, config) =>
    instance.post(url, body, config).then(responseBody).catch(responseError),
    put: (url, body, config) =>
    instance.put(url, body, config).then(responseBody).catch(responseError),
    delete: (url, config) =>
    instance.delete(url, config).then(responseBody).catch(responseError),
};

