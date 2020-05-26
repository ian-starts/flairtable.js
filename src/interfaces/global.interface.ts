export interface ConfigOptions {
    apiKey: string,
    userBearerKey?: string,
    endpointUrl?: string,
    apiVersion?: string,
    noRetryIfRateLimited?: boolean,
    requestTimeout?: number
}

export interface FlairTable {
    config: ConfigOptions,
    base: (baseId: string) => (tableId: string) => Table,
    signIn: (baseId: string, email: string, password: string, rememberMe?: RememberMe) => Promise<FlairTable>;
    signUp: (baseId: string, email: string, password: string, rememberMe?: RememberMe) => Promise<FlairTable>;
    signOut: () => FlairTable,
    onAuthChange: (callback: (user?: User) => void) => Unsubscribe;
}

export interface User {
    sub: string,
    email: string
}

export interface IAirtableException {
    error: any,
    message: string,
    statusCode: number,
    toString: () => string
}

export interface QueryObject {
    fields?: string[],
    filterByFormula?: string,
    maxRecords?: number,
    pageSize?: number,
    sort?: any[],
    view?: string,
    cellFormat?: string,
    timeZone?: string,
    userLocale?: string,
    offset?: string
}

export interface Table {
    select: (query?: QueryObject) => PaginatedResult,
    find: (itemId: string, singleItem?: SingleItemCallback) => void | Promise<any>,
    create: (records: any[] | any, multipleItems?: MultipleItemsCallback) => void | Promise<AirtableRecord[]>,
    update: (records: any[] | any, multipleItems?: MultipleItemsCallback) => void | Promise<AirtableRecord[]>,
    replace: (records: any[] | any, multipleItems?: MultipleItemsCallback) => void | Promise<AirtableRecord[]>,
    destroy: (recordsIds: string[] | string, multipleItems?: MultipleItemsCallback) => void | Promise<AirtableRecord[]>,
}

export interface PaginatedResult {
    eachPage: (page: Page, done?: Done) => void | Promise<any>,
    firstPage: (done?: Done) => void | Promise<any>,
}

export interface FetchNextPage {
    (): void
}

export interface Page {
    (records: any[], fetchNextPage: FetchNextPage): void,
}

export interface Done {
    (error: any): void,
}

export interface SingleItemCallback {
    (error: any, record: any): void;
}

export interface MultipleItemsCallback {
    (error: any, records: any[]): void;
}

export enum RememberMe {
    LOCAL = 'local',
    SESSION = 'session',
    NONE = 'none'
}

export interface AirtableRecord{
    id: string,
    getId: () => string,
    get: (name: string) => string,
}

export interface Unsubscribe {
    (): void;
}