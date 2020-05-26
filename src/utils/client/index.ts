import axios from 'axios';
import {Config} from "../../typings/axios";
import responseRejected from "./interceptor";

export const getClient = (token: string, baseUrl?: string, requestTimeOut?: number) => {
    const config = {
        baseURL: baseUrl ?? 'http://localhost:5001/flairtable/us-central1/api/api/v1',
        timeout: requestTimeOut,
        retry: 5,
        headers: {
            authorization: 'Bearer ' + token
        },
    };
    const instance = axios.create(config as Config)
    instance.interceptors.response.use(undefined, responseRejected)
    return instance;
};

export const getUserClient = (token: string, userBearerToken: string, baseUrl?: string, requestTimeOut?: number) => {
    const config = {
        baseURL: baseUrl ?? 'http://localhost:5001/flairtable/us-central1/api/api/v1',
        timeout: requestTimeOut,
        retry: 5,
        headers: {
            authorization: 'Bearer ' + token,
            "x-user-authorization": 'Bearer ' + userBearerToken
        },
    };
    const instance = axios.create(config as Config)
    instance.interceptors.response.use(undefined, responseRejected)
    return instance;
};