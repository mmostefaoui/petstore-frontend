import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {SpinnerComponent}    from './spinner.component';
import {HttpHelper} from "./http-helper";
import {HasAuthorityDirective} from "./has-authority.directive";
import {NavBarComponent} from "../navbar.component";
import {RouterModule} from "@angular/router";
import {PaginationComponent} from "./pagination.component";
import {CarouselComponent} from "./carousel.component";
import {SlideComponent} from "./slide.component";
import {FooterComponent} from "./footer.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        SpinnerComponent,
        HasAuthorityDirective,
        NavBarComponent,
        PaginationComponent,
        CarouselComponent,
        SlideComponent,
        FooterComponent
    ],
    exports: [
        SpinnerComponent,
        HasAuthorityDirective,
        NavBarComponent,
        PaginationComponent,
        CarouselComponent,
        SlideComponent,
        FooterComponent
    ], providers: [
        HttpHelper
    ]
})
export class SharedModule {
}
