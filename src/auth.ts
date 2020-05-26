import {getClient} from "./utils/client";
import {Flairtable} from "./index";
import {ConfigOptions, RememberMe, User} from "./interfaces/global.interface";
import {AxiosResponse} from "axios";
import {Evt} from "evt";
import jwt_decode from "jwt-decode";
import {getStoredAuthToken} from "./config";

export const getSignIn = (config: ConfigOptions, authEvent: Evt<User | undefined>) => (baseId: string, email: string, password: string, rememberMe?: RememberMe) => {
    const client = getClient(config.apiKey);
    return client.post(`signin`, {email: email, password: password, baseId: baseId}).then((response) => {
        sendUserEvent(response, authEvent);
        return getClientWithResponse(response, config, rememberMe);
    })
}

export const getSignUp = (config: ConfigOptions, authEvent: Evt<User | undefined>) => (baseId: string, email: string, password: string, rememberMe?: RememberMe) => {
    const client = getClient(config.apiKey);
    return client.post(`user`, {email: email, password: password, baseId: baseId}).then((response) => {
        sendUserEvent(response, authEvent);
        return getClientWithResponse(response, config, rememberMe);
    })
}

export const getSignOut = (authEvent: Evt<User | undefined>, config: ConfigOptions) => () => {
    authEvent.post(undefined);
    if (window) {
        window.sessionStorage.removeItem('x-user-token');
        window.localStorage.removeItem('x-user-token');
    }
    return Flairtable({...config, userBearerKey: undefined})
}

const sendUserEvent = (response: AxiosResponse, authEvent: Evt<User | undefined>) => {
    const token: any = jwt_decode(response.data.token);
    authEvent.post({
        sub: token.sub,
        email: token.email
    })
}
const getClientWithResponse = (response: AxiosResponse<any>, config: ConfigOptions, rememberMe?: RememberMe) => {
    if (window && rememberMe) {
        window.sessionStorage.removeItem('x-user-token');
        window.localStorage.removeItem('x-user-token');
        switch (rememberMe) {
            case RememberMe.SESSION:
                window.sessionStorage.setItem('x-user-token', response.data.token);
                break;
            case RememberMe.LOCAL:
                window.localStorage.setItem('x-user-token', response.data.token);
                break;
        }
    }
    return Flairtable({...config, userBearerKey: response.data.token})
}

export const getOnAuthChange = (eventHandler: Evt<User | undefined>) => (callback: (user?: User) => void) => {
    eventHandler.attach(callback);
    const storedAuthToken = getStoredAuthToken();
    if (storedAuthToken) {
        const decodedToken: any = jwt_decode(storedAuthToken);
        eventHandler.post({sub: decodedToken.sub, email: decodedToken.email})
    } else {
        eventHandler.post(undefined);
    }
    return () => {
        eventHandler.detach();
    }
}

