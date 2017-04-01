import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomeComponent} from "./home/home.component";
import {routing} from "./app.routing";
import {HasAuthorityDirective} from "./shared/has-authority.directive";
import {NotFoundComponent} from "./not-found.component";
import {usersRouting} from "./users/users.routing";
import {petsRouting} from "./pets/pets.routing";
import {UsersModule} from "./users/users.module";
import {PetsModule} from "./pets/pets.module";
import {SharedModule} from "./shared/shared.module";
import {AuthenticationGuard} from "./guard/authentication-guard";
import {ContactComponent} from "./contact/contact.component";
import {AccessDeniedComponent} from "./access-denied.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        NotFoundComponent,
        AccessDeniedComponent
    ],
    imports: [
        BrowserModule,
        UsersModule,
        PetsModule,
        SharedModule,
        usersRouting,
        petsRouting,
        routing
    ],
    providers:[
        AuthenticationGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
