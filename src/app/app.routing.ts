import {HomeComponent} from "./home/home.component";
import {Routes, RouterModule} from "@angular/router";
import {NotFoundComponent} from "./not-found.component";
import {ContactComponent} from "./contact/contact.component";
import {AccessDeniedComponent} from "./access-denied.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'access-denied', component: AccessDeniedComponent},
    {path: '**', redirectTo: 'not-found'}
];

export const routing = RouterModule.forRoot(appRoutes);