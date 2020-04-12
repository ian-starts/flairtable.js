import axios from './interceptor';
import {Config} from "../../typings/axios";

const getClient = (token: string, baseUrl?: string, requestTimeOut?: number) => {
        const config: Config = {
            baseURL: baseUrl ?? 'https://europe-west1-flairtable.cloudfunctions.net/table',
            timeout: requestTimeOut,
            retry: 5,
            headers: {
                authorization: 'Bearer ' + token
            },
        };
        return axios.create(config)
    };
export default getClient;