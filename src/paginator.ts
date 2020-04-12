import {AxiosInstance} from "axios";
import getClient from "./utils/client";
import {getQueryString} from "./query";

export const getPaginator = (config: ConfigOptions,
                             baseId: string,
                             tableId: string,
                             query?: QueryObject
) => {
    return {
        eachPage: (page: Page, done: Done) => {
            const response = getRecords(getClient(config.apiKey, undefined, config.requestTimeout), baseId, tableId, query);
            response.then((records) => {
                // if (records.offset){
                //
                // }
                page(records.records, () => {return;});
            })
        }
    }
};


const getRecords = (client: AxiosInstance, baseId: string, tableId: string, query?: QueryObject) => {
    return client.get(encodeURI(`/${baseId}/${tableId}${getQueryString(query)}`)).then(resp => {
        return resp.data;
    }).catch((error) => {
        throw error;
    });
};