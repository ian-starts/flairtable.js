import {getUserClient} from "./utils/client";
import {AxiosInstance} from "axios";
import {ConfigOptions, MultipleItemsCallback} from "./interfaces/global.interface";
import {getConfigWithAuthToken} from "./config";
import {map} from "./mappers/responseRecordsMapper";

export const getUpdate = (config: ConfigOptions, baseId: string, tableId: string) => (records: any[] | any, multipleItems?: MultipleItemsCallback) => {
    const authConfig =  getConfigWithAuthToken(config);
    if (authConfig.userBearerKey) {
        const client = getUserClient(authConfig.apiKey, authConfig.userBearerKey, undefined, authConfig.requestTimeout);
        const recordsArray = Array.isArray(records) ? records:[records];
        if (multipleItems) {
            updateRecords(client, baseId, tableId, recordsArray).then((createdRecords) => {
                multipleItems(null, createdRecords);
            });
            return;
        } else {
            return updateRecords(client, baseId, tableId, recordsArray);
        }
    }
    throw new Error("user not signed in");
};

const updateRecords = (client: AxiosInstance, baseId: string, tableId: string, records: any[]) => {
    return client.patch(encodeURI(`/${baseId}/${tableId}`), {records: records}).then(resp => {
        return resp.data.records.map(map);
    });
}
