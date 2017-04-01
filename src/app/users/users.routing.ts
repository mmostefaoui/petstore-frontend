import {RouterModule} from "@angular/router";
import {LoginFormComponent} from "./login-form.component";
import {SignupFormComponent} from "./signup-form.component";
import {AccountConfirmationComponent} from "./account-confirmation.component";
export const usersRouting = RouterModule.forChild([
    {
        path: 'login',
        component: LoginFormComponent
    },
    {
        path: 'signup',
        component: SignupFormComponent
    },
    {
        path: 'account-confirm',
        component: AccountConfirmationComponent
    }
]);