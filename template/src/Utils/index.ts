import axios, { AxiosRequestConfig, AxiosError } from 'axios';

export const request = async <T>(
    config: AxiosRequestConfig,
    log = true
): Promise<T> => {
    if (!axios.defaults.baseURL) {
        throw new Error('Error: Base Url is not provided');
    }
    const resp = await axios.request<T>(config);

    return resp.data;
};

const utils = {
    setBaseAPI_URL: (url: string) => {
        axios.defaults.baseURL = url;
    },

    setHeader: (type = 'Content-Type', value = 'application/json') => {
        axios.defaults.headers.post[type] = value;
    },

    setAuthHeader: (accessToken?: string) => {
        axios.defaults.headers.common.Authorization = accessToken;
    },

    throwError: (error: AxiosError) => {
        console.log('Error', error.response);
        throw error;
    },
};

export default utils;
