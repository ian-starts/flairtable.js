import {getUserClient} from "./utils/client";
import {AxiosInstance} from "axios";
import {AirtableRecord, ConfigOptions, MultipleItemsCallback} from "./interfaces/global.interface";
import {getConfigWithAuthToken} from "./config";
import {map} from "./mappers/responseRecordsMapper";

export const getCreate = (config: ConfigOptions, baseId: string, tableId: string) => (records: any[] | any, multipleItems?: MultipleItemsCallback) => {
    const authConfig = getConfigWithAuthToken(config);
    if (authConfig.userBearerKey) {
        const client = getUserClient(authConfig.apiKey, authConfig.userBearerKey, undefined, authConfig.requestTimeout);
        const recordsArray = Array.isArray(records) ? records : [records];
        if (multipleItems) {
            createRecords(client, baseId, tableId, recordsArray).then((createdRecords) => {
                multipleItems(null, createdRecords);
            });
            return;
        } else {
            return createRecords(client, baseId, tableId, recordsArray);
        }
    }
    throw new Error("user not signed in");
};

const createRecords = (client: AxiosInstance, baseId: string, tableId: string, records: any[]): Promise<AirtableRecord[]> => {
    return client.post(encodeURI(`/${baseId}/${tableId}`), {records: records}).then(resp => {
        return resp.data.records.map(map);
    });
}
