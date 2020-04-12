import getClient from "./utils/client";

export const getFind = (config: ConfigOptions, baseId: string, tableId: string) => (itemId: string, singleItem:SingleItem) => {
    const client = getClient(config.apiKey, undefined, config.requestTimeout);
};
