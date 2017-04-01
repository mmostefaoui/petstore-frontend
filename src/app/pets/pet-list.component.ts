import {Component, OnInit} from '@angular/core';
import {Pet, Category} from "./pet";
import {PetService} from "./pet.service";
import {PetFilter} from "./pet-filter";
import * as _ from 'underscore';

@Component({
    templateUrl: 'pet-list.component.html',
    styles: [`
        .thumbnail {
            border-radius: 100%;
        }
`]
})
export class PetListComponent implements OnInit {
    pets: Pet[] = [];
    petsLoading: boolean = true;
    categories: Category[] = [];
    pageSize: number = 3;
    pagedPets: Pet[] = [];
    currentPet: Pet;
    filteredPets: Pet[] = [];

    constructor(private _petService: PetService) {

    }

    ngOnInit() {
        console.log('ngOnInit pet-list component');
        this._loadCategories();
        this._loadPets();
    }



    filterByCategory(filter?: PetFilter) {
        this.currentPet = null;
        if (filter && filter.categoryId) {
            this.filteredPets = this.pets.filter(p=>p.category.id == filter.categoryId);
        } else {
            this.filteredPets = this.pets;
        }
        this.pagedPets = _.take(this.filteredPets, this.pageSize);
    }

    private _loadCategories() {
        this._petService.getCategories()
            .subscribe(categories=> {
                    this.categories = categories
                },
                err=> {
                    console.log(err);
                },
                ()=> {
                    console.log('Categories loaded')
                });
    }

    private _loadPets() {
        console.log('_loadPets()');
        this._petService.getPets()
            .subscribe(pets=> {
                    this.pets = pets;
                    this.filteredPets = pets;
                    this.pagedPets = _.take(this.filteredPets, this.pageSize);
                },
                err=> {
                    console.log(err);
                },
                ()=> {
                    this.petsLoading = false;
                })
    }

    onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedPets = _.take(_.rest(this.filteredPets, startIndex), this.pageSize);
    }

    select(pet) {
        this.currentPet = pet;
    }

    // Users can only delete pets which have been sold
    deletePet(pet: Pet) {
        if (confirm("Are you sure you want to delete " + pet.name + "?")) {
            var filteredPetsIndex = this.filteredPets.findIndex(p=>p.id == pet.id);
            this.filteredPets.splice(filteredPetsIndex, 1);

            var petsIndex = this.pets.findIndex(p=>p.id == pet.id);
            if (petsIndex > -1)
                this.pets.splice(petsIndex, 1);

            this.pagedPets = _.take(this.filteredPets, this.pageSize);
            this._petService.deletePet(pet.id)
                .subscribe(null,
                    err => {
                        alert("Could not delete the pet.");
                        this.filteredPets.splice(filteredPetsIndex, 0, pet);
                        this.pets.splice(petsIndex, 0, pet);
                    });
        }
    }
}
