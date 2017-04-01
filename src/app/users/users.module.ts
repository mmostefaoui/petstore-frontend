import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

import {LoginFormComponent} from "./login-form.component";
import {SignupFormComponent} from "./signup-form.component";

import {UserService} from "./user.service";
import {AccountConfirmationComponent} from "./account-confirmation.component";


@NgModule({
    declarations: [
        LoginFormComponent,
        SignupFormComponent,
        AccountConfirmationComponent
    ],
    exports:[
        LoginFormComponent,
        SignupFormComponent,
        AccountConfirmationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule
    ],
    providers: [
        UserService
    ]
})
export class UsersModule {
}
