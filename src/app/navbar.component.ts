import {Component} from '@angular/core';
import {UserService} from "./users/user.service";
import {Location} from '@angular/common';
import {User} from "./users/user";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styles:[`
.navbar {
    margin-bottom: 0;
}
`]
})
export class NavBarComponent{

    constructor(public userService: UserService
        , private _location: Location) {
    }

    logout(event: Event): void {
        event.preventDefault();
        this.userService.logout();
        
    }

    highlight(path: string) {
        return this._location.path() === path;
    }
}