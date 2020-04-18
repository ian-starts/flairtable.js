export const AirtableException = (error: any, message: string, statusCode: number): AirtableException =>
    ({
        error: error,
        message: message,
        statusCode: statusCode,
        toString: () => `${message} (${error}) ${statusCode ? '[Http code ' + statusCode + ']' : ''}`
    });