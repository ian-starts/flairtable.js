import {getUserClient} from "./utils/client";
import {AxiosInstance} from "axios";
import {ConfigOptions, MultipleItemsCallback} from "./interfaces/global.interface";
import {getConfigWithAuthToken} from "./config";

export const getDestroy = (config: ConfigOptions, baseId: string, tableId: string) => (recordsIds: string[] | string, multipleItems?: MultipleItemsCallback) => {
    const authConfig = getConfigWithAuthToken(config);
    if (authConfig.userBearerKey) {
        const client = getUserClient(authConfig.apiKey, authConfig.userBearerKey, undefined, authConfig.requestTimeout);
        const recordsArray = Array.isArray(recordsIds) ? recordsIds : [recordsIds];
        if (multipleItems) {
            deleteRecords(client, baseId, tableId, recordsArray).then((createdRecords) => {
                multipleItems(null, createdRecords);
            });
            return;
        } else {
            return deleteRecords(client, baseId, tableId, recordsArray);
        }
    }
    throw new Error("user not signed in");
};

const deleteRecords = (client: AxiosInstance, baseId: string, tableId: string, recordsIds: string[]) => {
    const query = recordsIds.map((recordId) => `records[]=${recordId}`).join('&');
    if (query) {
        return client.delete(encodeURI(`/${baseId}/${tableId}?${query}`)).then(resp => {
            return resp.data.records;
        });
    }
    throw Error("No data supplied")
};