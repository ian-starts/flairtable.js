import {ConfigOptions} from "./interfaces/global.interface";

export const getConfigWithAuthToken = (config: ConfigOptions): ConfigOptions => {
    if (!config.userBearerKey) {
        return {
            ...config,
            userBearerKey: getStoredAuthToken()
        }
    }
    return {...config}
};

export const getStoredAuthToken = (): string | undefined => {
    if (window?.localStorage.getItem('x-user-token')) {
        return window.localStorage.getItem('x-user-token') as string;
    }
    if (window?.sessionStorage.getItem('x-user-token')) {
        return window.sessionStorage.getItem('x-user-token') as string;
    }
}