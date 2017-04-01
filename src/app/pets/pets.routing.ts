import {RouterModule} from "@angular/router";
import {PetItemComponent} from "./pet-item.component";
import {PetListComponent} from "./pet-list.component";
import {AuthenticationGuard} from "../guard/authentication-guard";
export const petsRouting = RouterModule.forChild([
    {
        path: 'pets/:id',
        component: PetItemComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'pets/new',
        component: PetItemComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'pets',
        component: PetListComponent,
        canActivate: [AuthenticationGuard]
    },
]);