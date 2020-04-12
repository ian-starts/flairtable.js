import axios from 'axios';
import {Config} from "../../typings/axios";
// Add a response interceptor
axios.interceptors.response.use(undefined, function (err) {
    const config = err.config as Config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) {
        return Promise.reject(err);
    }
    if (err.response.status !== 429) {
        return Promise.reject(err);
    }
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    const backoff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, exponentialBackoffWithJitter(config.__retryCount || 1));
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
        return axios(config);
    });
});

export default axios;