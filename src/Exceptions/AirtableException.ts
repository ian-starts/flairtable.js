import {IAirtableException} from "../interfaces/global.interface";

export const AirtableException = (error: any, message: string, statusCode: number): IAirtableException =>
    ({
        error: error,
        message: message,
        statusCode: statusCode,
        toString: () => `${message} (${error}) ${statusCode ? '[Http code ' + statusCode + ']' : ''}`
    });