import {getSelect} from "./select";
import {getFind} from "./find";
import {getCreate} from "./create";
import {getReplace} from "./replace";
import {getUpdate} from "./update";
import {getDestroy} from "./destroy";
import {getOnAuthChange, getSignIn, getSignOut, getSignUp} from "./auth";
import {ConfigOptions, FlairTable, User} from "./interfaces/global.interface";
import {Evt} from "evt";

export const Flairtable = function (this: any, opt: ConfigOptions): FlairTable {
    const authEvent = new Evt<User | undefined>();
    return {
        config: opt,
        base: getBase(opt),
        signIn: getSignIn(opt, authEvent),
        signUp: getSignUp(opt, authEvent),
        signOut: getSignOut(authEvent, opt),
        onAuthChange: getOnAuthChange(authEvent)
    }
};

const getBase = (config: ConfigOptions) => (baseId: string) => (tableId: string) => {
    return getTable(config, baseId, tableId);
};

const getTable = function (config: ConfigOptions, baseId: string, tableId: string) {
    return {
        select: getSelect(config, baseId, tableId),
        find: getFind(config, baseId, tableId),
        create: getCreate(config, baseId, tableId),
        update: getUpdate(config, baseId, tableId),
        replace: getReplace(config, baseId, tableId),
        destroy: getDestroy(config, baseId, tableId),
    }
};


