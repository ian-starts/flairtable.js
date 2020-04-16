import getClient from "./utils/client";
import {AxiosInstance} from "axios";

export const getFind = (config: ConfigOptions, baseId: string, tableId: string) => (itemId: string, singleItem?: SingleItem) => {
    const client = getClient(config.apiKey, undefined, config.requestTimeout);
    if (singleItem) {
        getRecord(client, baseId, tableId, itemId).then((record) => {
            singleItem(null, record);
        }).catch((error) => {
            throw(error);
        })
    }
    else{
        return getRecord(client, baseId, tableId, itemId).then((record) => {
            return record;
        }).catch((error) => {
            throw(error);
        })
    }
};

const getRecord = (client: AxiosInstance, baseId: string, tableId: string, itemId: string) => {
    return client.get(encodeURI(`/${baseId}/${tableId}/${itemId}`)).then(resp => {
        return resp.data;
    }).catch((error) => {
        throw error;
    });
};