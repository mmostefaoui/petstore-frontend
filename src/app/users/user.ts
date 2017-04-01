import * as _ from 'lodash';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phone: string;
    userStatus: number;
    authorities: Array<string>;
    authenticated: boolean;
}

export class User implements IUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phone: string;
    userStatus: number;
    password:string;
    matchingPassword:string;
    authorities: Array<string>;
    authenticated: boolean;

    constructor(user?: {firstName: string, lastName: string, email: string, username: string, phone: string, userStatus: number, authorities: Array<string>, authenticated: boolean}) {
        if (user) {
            _.assignIn(this, user);
        }
    }
}