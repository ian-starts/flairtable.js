import responseRejected from "../src/utils/client/interceptor";

const config = {
    "config": {
        "transformRequest": {},
        "transformResponse": {},
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "authorization": "Bearer kc5nwLJmNMTdhaqI3BfLutZbbSq2"
        },
        "method": "get",
        "baseURL": "https://flairtable.com/api/v1",
        "retry": 5,
        "url": "https://flairtable.com/api/v1/apptvMhO0o7aFEB7/Table%201?maxRecords=10"
    },
}
const request = {
    "request": {
        "upload": {
            "_ownerDocument": {
                "location": {
                    "href": "http://localhost/",
                    "origin": "http://localhost",
                    "protocol": "http:",
                    "host": "localhost",
                    "hostname": "localhost",
                    "port": "",
                    "pathname": "/",
                    "search": "",
                    "hash": ""
                }
            }
        },
        "_registeredHandlers": {},
        "_eventHandlers": {}
    },
}
const response = {
    "response": {
        "data": {
            "error": "NOT_FOUND"
        },
        "status": 404,
        "statusText": "Not Found",
        "headers": {
            "cache-control": "private",
            "content-type": "application/json; charset=utf-8"
        },
        "config": {
            "transformRequest": {},
            "transformResponse": {},
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "authorization": "Bearer testberaer"
            },
            "method": "get",
            "baseURL": "https://flairtable.com/api/v1",
            "retry": 5,
            "url": "https://flairtable.com/api/v1/base/table"
        },
        "request": {
            "upload": {
                "_ownerDocument": {
                    "location": {
                        "href": "http://localhost/",
                        "origin": "http://localhost",
                        "protocol": "http:",
                        "host": "localhost",
                        "hostname": "localhost",
                        "port": "",
                        "pathname": "/",
                        "search": "",
                        "hash": ""
                    }
                }
            },
            "_registeredHandlers": {},
            "_eventHandlers": {}
        }
    }
}
test("check without config set", () => {
        const errorNoConfig = {...request, ...response}
        expect.assertions(1);
        return responseRejected(errorNoConfig).catch(e => {
            return expect(e).toBe("undefined (NOT_FOUND) [Http code 404]");
        });
    }
);

test("check with config set", () => {
        const error = {...config, ...request, ...response}
        expect.assertions(1);
        return responseRejected(error).catch(e => {
            return expect(e).toBe("undefined (NOT_FOUND) [Http code 404]");
        });
    }
);

test("check with 429", () => {
        let newResponse = response;
        newResponse.response.status = 429;
        let newConfig = config;
        config.config.retry = 0;
        const error = {...newConfig, ...request, ...newResponse}
        expect.assertions(1);
        return responseRejected(error).catch(e => {
            return expect(e).toBe("You have made too many requests in a short period of time. Please retry your request later (TOO_MANY_REQUESTS) [Http code 429]");
        });
    }
);



