import {getPaginator} from "./paginator";
import {ConfigOptions, QueryObject} from "./interfaces/global.interface";

export const getSelect = (config: ConfigOptions, baseId: string, tableId: string) => (query?: QueryObject) => {
    return getPaginator({config: config, baseId: baseId, tableId: tableId, query: query})
};
