import axios from 'axios';
import {Config} from "../../typings/axios";
import responseRejected from "./interceptor";

const getClient = (token: string, baseUrl?: string, requestTimeOut?: number) => {
    const config = {
        baseURL: baseUrl ?? 'https://flairtable.com/api/v1',
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
export default getClient;