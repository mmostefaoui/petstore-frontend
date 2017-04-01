

import {FormControl} from "@angular/forms";

export class UsernameValidators {

    static shouldBeUnique(control:FormControl) {
        return new Promise((resolve, reject)=> {
            // simulate a call to the server
            setTimeout(function () {
                if (control.value == 'joe')
                    return resolve({shouldBeUnique: true});
                else
                    return resolve(null);
            }, 1000);
        })
    }

    static cannotContainSpace(control:FormControl) {
        if (control.value.indexOf(' ') >= 0) {
            return {cannotContainSpace: true};
        }
        return null;
    }
}