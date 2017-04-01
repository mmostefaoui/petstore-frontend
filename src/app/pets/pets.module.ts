import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HttpModule} from '@angular/http';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PetItemComponent} from "./pet-item.component";
import {PetListComponent} from "./pet-list.component";
import {PetService} from "./pet.service";
import {DebugPanelComponent} from "../debug-panel/debug-panel.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        PetListComponent,
        PetItemComponent,
        DebugPanelComponent
    ],
    exports: [
        PetListComponent,
        PetItemComponent,
        DebugPanelComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        SharedModule
    ],
    providers: [
        PetService
    ]
})
export class PetsModule {
}
