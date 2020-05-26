import axios from 'axios';
import {Config} from "../../typings/axios";
import {AirtableException} from "../../Exceptions/AirtableException";
// Add a response interceptor
const responseRejected = function (err: any) {
    const config = err.config as Config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) {
        const error = checkStatusForError(err.response.status, err);
        return Promise.reject(error === null ? err : error.toString());
    }
    if (err.response.status !== 429) {
        const error = checkStatusForError(err.response.status, err);
        return Promise.reject(error === null ? err : error.toString());
    }
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        const error = checkStatusForError(err.response.status, err);
        return Promise.reject(error === null ? err : error.toString());
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
}

const checkStatusForError = (statusCode: number, error: any) => {
    if (statusCode === 401) {
        return AirtableException(
            'AUTHENTICATION_REQUIRED',
            'You should provide valid api key to perform this operation',
            statusCode
        );
    } else if (statusCode === 403) {
        return AirtableException(
            'NOT_AUTHORIZED',
            'You are not authorized to perform this operation',
            statusCode
        );
    } else if (statusCode === 404) {
        return (function () {
            const message =
                error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error.message
                    : 'Could not find what you are looking for';
            return AirtableException('NOT_FOUND', message, statusCode);
        })();
    } else if (statusCode === 413) {
        return AirtableException('REQUEST_TOO_LARGE', 'Request body is too large', statusCode);
    } else if (statusCode === 422) {
        return (function () {
            const type =
                error && error.type ? error.type : 'UNPROCESSABLE_ENTITY';
            const message =
                error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error.message
                    : 'The operation cannot be processed';
            return AirtableException(type, message, statusCode);
        })();
    } else if (statusCode === 429) {
        return AirtableException(
            'TOO_MANY_REQUESTS',
            'You have made too many requests in a short period of time. Please retry your request later',
            statusCode
        );
    } else if (statusCode === 500) {
        return AirtableException(
            'SERVER_ERROR',
            'Try again. If the problem persists, contact support.',
            statusCode
        );
    } else if (statusCode === 503) {
        return AirtableException(
            'SERVICE_UNAVAILABLE',
            'The service is temporarily unavailable. Please retry shortly.',
            statusCode
        );
    } else if (statusCode === 409) {
        return (function () {
            const type = 'ENTITY_CONFLICT';
            const message =
                error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error.message
                    : 'Could not find what you are looking for';
            return AirtableException(type, message, statusCode);
        })();
    } else if (statusCode >= 400) {
        return (function () {
            const type = error && error.type ? error.type : 'UNEXPECTED_ERROR';
            const message =
                error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error.message
                    : 'An unexpected error occurred';
            return AirtableException(type, message, statusCode);
        })();
    } else {
        return null;
    }
}
export default responseRejected;