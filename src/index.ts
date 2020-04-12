import {getSelect} from "./select";
import {getFind} from "./find";

export const Flairtable = function (opt: ConfigOptions): FlairTable {
    return {
        config: opt,
        base: getBase(opt)
    }
};

const getBase = (config: ConfigOptions) => (baseId: string) => (tableId: string) => {
    return getTable(config, baseId, tableId);
};

const getTable = function (config: ConfigOptions, baseId: string, tableId: string) {
    return {
        select: getSelect(config, baseId, tableId),
        find: getFind(config, baseId, tableId)
    }
};


