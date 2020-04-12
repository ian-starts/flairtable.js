import {getPaginator} from "./paginator";

export const getSelect = (config: ConfigOptions, baseId: string, tableId: string) => (query?: QueryObject) => {
    return getPaginator(config, baseId, tableId, query)
};
