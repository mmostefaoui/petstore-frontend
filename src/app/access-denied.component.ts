import {Component, OnInit} from '@angular/core';
import {User} from "./users/user";
import {UserService} from "./users/user.service";


@Component({
    template: `
 <div class="row">
    <div class="col-md-12">
        <div class="box">
            <h1>Access Denied</h1>
                <div class=" jumbotron alert alert-danger text-center">
                    <p>Dear <strong>{{user.firstName}} {{user.lastName}}</strong>, You are not authorized to access this
                        page</p>
                </div>
        </div>
    </div>
</div>
    `
})
export class AccessDeniedComponent implements OnInit {
    user: User;

    constructor(private _userService: UserService) {
    }

    ngOnInit(): void {
        this.user = this._userService.currentUser();
    }

}