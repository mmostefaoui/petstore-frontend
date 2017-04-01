import {FormControl, FormGroup} from "@angular/forms";
export class PasswordValidators {

    static validate(control: FormControl) {
        const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/;

        if (!PASSWORD_REGEXP.test(control.value)) {
            return {validate: true};
        }
        return null;
    }

    static passwordsShouldMatch(group: FormGroup) {
        let password: string = group.get('password').value;
        let confirmPassword: string = group.get('matchingPassword').value;

        if (password == '' || confirmPassword == '')
            return null;

        if (password != confirmPassword)
            return {passwordsShouldMatch: true};

        return null;
    }
}