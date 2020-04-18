// tslint:disable-next-line:no-namespace
interface ConfigOptions {
    apiKey: string,
    endpointUrl?: string,
    apiVersion?: string,
    noRetryIfRateLimited?: boolean,
    requestTimeout?: number
}

interface FlairTable {
    config: ConfigOptions,
    base: (baseId: string) => (tableId: string) => Table
}

interface AirtableException {
    error: any,
    message: string,
    statusCode : number,
    toString: () => string
}

interface QueryObject {
    fields?: string[],
    filterByFormula?: string,
    maxRecords?: number,
    pageSize?: number,
    sort?: Object[],
    view?: string,
    cellFormat?: string,
    timeZone?: string,
    userLocale?: string,
    offset?: string
}

interface Table {
    select: (query?: QueryObject) => PaginatedResult,
    find: (itemId: string, singleItem?: SingleItem) => void | Promise<any>,
}

interface PaginatedResult {
    eachPage: (page: Page, done?: Done) => void | Promise<any>,
    firstPage: (done?: Done) => void | Promise<any>,
}

interface FetchNextPage {
    (): void
}

interface Page {
    (records: any[], fetchNextPage: FetchNextPage): void,
}

interface Done {
    (error: any): void,
}

interface SingleItem {
    (error: any, record: any): void;
}