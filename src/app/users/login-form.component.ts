import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {PasswordValidators} from "./password.validators";
import {UsernameValidators} from "./username.validators";
import {UserService} from "./user.service";
import {IUserCredentials} from "./user-credentials";
import {Router} from "@angular/router";

@Component({
    templateUrl: 'login-form.component.html',
})
export class LoginFormComponent implements OnInit {
    creds: IUserCredentials = {username: '', password: ''};
    loginForm: FormGroup;
    loading: boolean = false;
    error: string = '';

    constructor(private _formBuilder: FormBuilder,
                private _userService: UserService,
                private _router: Router) {
        this._buildForm();
    }

    private _buildForm() {
        this.loginForm = this._formBuilder.group({
            username: [''
                , Validators.compose([
                    Validators.required,
                    UsernameValidators.cannotContainSpace])],
            password: ['', Validators.compose(
                [
                    Validators.required,
                    PasswordValidators.validate
                ])]
        });
    }

    ngOnInit(): void {
        this._userService.logout();
    }

    login(): void {
        this.loading = true;

        this._userService.login(this.creds)
            .subscribe(user=> {
                    this._router.navigate(['/pets']);
                },
                err=> {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                });
    }
}
