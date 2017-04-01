import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {STORAGE_AUTHENTICATION_TOKEN} from "../shared/app.constants";

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (localStorage.getItem(STORAGE_AUTHENTICATION_TOKEN)) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this._redirectToLogin();
        return false;
    }


    private _redirectToLogin() {
        this._router.navigate(['/login']);
    }

}
