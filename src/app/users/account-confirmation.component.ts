import {OnInit, Component} from "@angular/core";
import {UserService} from "./user.service";
@Component({
    template: `
<div class="row">
    <div class="col-md-12">
        <div class="box">
            <h1>Email Confirmation</h1>
            <div class="text-center">
                <h3>Thank you!</h3>
                <p>We've sent you an email  to <span class="text-primary">{{email}}</span></p>
                <p>Please click the link in that message to <br>
                    activate your account.
                </p>
                
            </div>
        </div>
    </div>
</div>
     
`
})
export class AccountConfirmationComponent implements OnInit {

    email: string;

    constructor(private _userService: UserService) {
    }

    ngOnInit(): void {
        this.email = this._userService.getConfirmEmail();
    }
}