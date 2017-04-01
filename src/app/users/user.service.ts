import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Response} from "@angular/http";
import {IUser, User} from "./user";
import {HttpHelper} from "../shared/http-helper";
import {IUserCredentials} from "./user-credentials";
import {
    STORAGE_PROFILE_TOKEN, SERVER_ERROR, API_AUTHENTICATE_PATH, API_USERS_PATH,
    CONFIRM_EMAIL
} from "../shared/app.constants";
import {Router} from "@angular/router";

@Injectable()
export class UserService {

    constructor(private _httpHelper: HttpHelper,
                private _router: Router) {
    }

    getUsers(): Observable<IUser[]> {
        return this._httpHelper.get(API_USERS_PATH)
            .map((res: Response)=><IUser[]>res.json())
            .do(data=>console.log('All: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    userExists(username) {
        this._httpHelper.get(API_USERS_PATH + '/check/' + username)
            .map((res: Response)=>res.json())
            .do(data=>console.log('data: ' + JSON.stringify(data)))
            .catch(this._handleError);
    }

    login(creds: IUserCredentials) {
        this._httpHelper.setCredentials(creds);
        return this._httpHelper.post(API_AUTHENTICATE_PATH, {})
            .map((res: Response)=><IUser>res.json())
            .do(data=> {
                data.authenticated = true;
                this._saveProfile(data);
                console.log(JSON.stringify(data))
            })
            .catch(this._handleError);
    };


    signup(user: User) {
        console.log('sign up user');
        return this._httpHelper.post(API_USERS_PATH, JSON.stringify(user))
            .map((res: Response)=>res.json())
            .do(data=> {
                /*
                 data.authenticated = true;

                 // auto login
                 let creds: IUserCredentials = {
                 username: user.username,
                 password: user.password
                 };
                 this._httpHelper.setCredentials(creds);*/
                console.log('UserService:signup(user)-->' + JSON.stringify(data))
            })
            .catch(this._handleError);
    }

    logout() {
        console.log('Logging out');
        this._httpHelper.clearCredentials();
        this._router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(STORAGE_PROFILE_TOKEN);
    }

    hasAuthority(roles: Array<string>): boolean {
        let authorized: boolean = false;
        if (this.isAuthenticated() && roles) {
            let user: User = JSON.parse(localStorage.getItem(STORAGE_PROFILE_TOKEN));
            if (user && user.authorities) {
                for (let i = 0; i < roles.length; i++) {
                    if (user.authorities.indexOf(roles[i].trim()) !== -1) {
                        authorized = true;
                        break;
                    }
                }
            }
        }
        return authorized;
    }

    private _saveProfile(profile) {
        localStorage.setItem(STORAGE_PROFILE_TOKEN, JSON.stringify(profile));
    }

    currentUser() {
        return new User(JSON.parse(localStorage.getItem(STORAGE_PROFILE_TOKEN)))
    }

    private _handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || SERVER_ERROR);
    }

    saveEmail(email: string): void {
        localStorage.setItem(CONFIRM_EMAIL, email);
    }

    getConfirmEmail(): string {
        return localStorage.getItem(CONFIRM_EMAIL);
    }
}
