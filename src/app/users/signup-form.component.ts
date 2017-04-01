import {OnInit, Component} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {User} from "./user";
import {PasswordValidators} from "./password.validators";
import {UsernameValidators} from "./username.validators";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {EmailValidators} from "./email.validators";

@Component({
    templateUrl: 'signup-form.component.html'
})
export class SignupFormComponent implements OnInit {
    user: User = new User();
    signupForm: FormGroup;
    loading: boolean = false;

    constructor(private _formBuilder: FormBuilder,
                private _userService: UserService,
                private _router: Router) {
        this._buildForm();
    }

    private _buildForm() {
        this.signupForm = this._formBuilder.group({
            username: [''
                , Validators.compose([
                    Validators.required,
                    UsernameValidators.cannotContainSpace])],
            email: ['', Validators.compose(
                [
                    Validators.required
                    // ,EmailValidators.validate
                ])],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phone: ['', Validators.required],
            password: ['', Validators.compose(
                [
                    Validators.required
                    //, PasswordValidators.validate
                ])],
            matchingPassword: ['', Validators.required],
        }, PasswordValidators.passwordsShouldMatch);
    }

    ngOnInit(): void {

    }

    signup() {
        console.log(this.user);
        this.loading = true;
        this._userService.signup(this.user)
            .subscribe((_)=> {
                    this._userService.saveEmail(this.user.email);
                    this._router.navigate(['/account-confirm']);
                },
                err=> {
                    console.log(err)
                }
                , ()=> {
                    this.loading = false
                });
    }

}