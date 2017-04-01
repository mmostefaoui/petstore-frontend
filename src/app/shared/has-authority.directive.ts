import {UserService} from "../users/user.service";
import {Directive, Input, ElementRef} from "@angular/core";

@Directive({
    selector: '[hasAuthority]'
})
export class HasAuthorityDirective {
    @Input('hasAuthority') grantPrivilege: string;

    constructor(private _elementRef: ElementRef,
                private _userService: UserService) {

    }

    ngOnInit(): void {
        let privileges = this.grantPrivilege.split(',');

        if (privileges.length > 0 && !this._userService.hasAuthority(privileges)) {
            let el: HTMLElement = this._elementRef.nativeElement;
            el.parentNode.removeChild(el);
        }
    }
}
