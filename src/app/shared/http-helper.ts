import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Base64} from 'js-base64'
import {IUserCredentials} from "../users/user-credentials";
import {
    STORAGE_AUTHENTICATION_TOKEN, BASIC_AUTH_SEPARATOR, STORAGE_PROFILE_TOKEN,
    AUTHORIZATION_HEADER, BASIC_PREFIX, CONFIRM_EMAIL
} from "./app.constants";

@Injectable()
export class HttpHelper {

    private _currentUser: any;

    constructor(private _http: Http) {
        this._currentUser = JSON.parse(localStorage.getItem(STORAGE_AUTHENTICATION_TOKEN));
    }

    setCredentials(creds: IUserCredentials) {
        this.clearCredentials();
        this._currentUser = {
            username: creds.username,
            authData: Base64.encode(creds.username + BASIC_AUTH_SEPARATOR + creds.password)
        };
        localStorage.setItem(STORAGE_AUTHENTICATION_TOKEN, JSON.stringify(this._currentUser));
    }

    clearCredentials() {
        localStorage.removeItem(STORAGE_AUTHENTICATION_TOKEN);
        localStorage.removeItem(STORAGE_PROFILE_TOKEN);
        localStorage.removeItem(CONFIRM_EMAIL);
    }

    private createAuthorizationHeader(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        if (this._currentUser && this._currentUser.authData) {
            headers.append(AUTHORIZATION_HEADER, BASIC_PREFIX + this._currentUser.authData);
        }
    }

    get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.get(url, {
            headers: headers
        });
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.post(url, data, {
            headers: headers
        });
    }

    put(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.put(url, data, {
            headers: headers
        });
    }

    delete(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this._http.delete(url, {
            headers: headers
        });
    }
}
