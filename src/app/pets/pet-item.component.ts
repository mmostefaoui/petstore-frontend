import {Component, OnInit} from '@angular/core';
import {Pet, Category} from "./pet";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {PetService} from "./pet.service";
import {FormBuilder, Validators, FormGroup, FormArray, FormControl} from "@angular/forms";
import {UserService} from "../users/user.service";

@Component({
    templateUrl: 'pet-item.component.html',
    styles: [`
                ul {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                }
                ul > li {
                  margin-bottom: 4px;
                }
                .size ul > li {
                  display: inline-block;
                  margin-right: 2em;
                }
                form > section {
                  margin-bottom: 2em;
                }
                ul>li>div{
                    width: 50%;
                }
                .section-back{
                    padding-top: 20px;
                }
            `]
})
export class PetItemComponent implements OnInit {
    title: string;
    petForm: FormGroup;
    tagsControls: FormArray;
    photoUrlsControls: FormArray;
    formActive: boolean = true;
    categories: Category[];
    categoriesLoading: boolean = true;
    currentCategory = new Category();
    pet = new Pet();
    submitted: boolean = false;
    editPetLoading: boolean = false;
    savingLoading: boolean = false;

    constructor(private _fb: FormBuilder,
                private _router: Router,
                private _route: ActivatedRoute,
                private _petService: PetService,
                private _userService: UserService) {

        this._buildForm();
    }

    private _buildForm() {
        this.petForm = this._fb.group({
            category: this._fb.group({
                id: ['0', Validators.required],
                name: ['', Validators.required]
            }),
            name: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(2)
            ])),
            photoUrls: this._fb.array([
                this._fb.control(null)
            ]),
            tags: this._fb.array([
                this._fb.group({
                    name: ['', Validators.required]
                })
            ]),
            status: ['', Validators.required]
        });

        this.photoUrlsControls = this.petForm.get('photoUrls') as FormArray;
        this.tagsControls = this.petForm.get('tags') as FormArray;
    }

    private _initializeControls() {
        this._initCategoryValue();
        this._initNameValue();
        this._initPhotoUrlsValues();
        this._initTagsValues();
        this._initStatusValue();
    }

    private _initCategoryValue() {
        const control = this.petForm.get('category') as FormGroup;
        control.setValue(this.pet.category);
    }

    private _initNameValue() {
        const control = this.petForm.get('name') as FormControl;
        control.setValue(this.pet.name);
    }

    private _initPhotoUrlsValues() {
        // remove all
        for (var index = 0; index < this.photoUrlsControls.length; index++) {
            this.onRemovePhotoUrl(index)
        }
        // add dynamically controls with values
        for (var i = 0; i < this.pet.photoUrls.length; i++) {
            this.photoUrlsControls.push(this._fb.control(this.pet.photoUrls[i]));
        }
    }

    private _initTagsValues() {
        // remove all
        for (let index = 0; index < this.tagsControls.length; index++) {
            this.onRemoveTag(index)
        }

        // add dynamically controls with values
        for (let i = 0; i < this.pet.tags.length; i++) {
            this.tagsControls.push(this._fb.group({
                name: [this.pet.tags[i].name]
            }));
        }
    }

    private _initStatusValue() {
        const control = this.petForm.get('status') as FormControl;
        control.setValue(this.pet.status);
    }

    onAddTag($event) {
        event.preventDefault();
        event.stopPropagation();
        const control = <FormArray>this.petForm.controls['tags'];
        control.push(this._initTagsChildControl());
    }

    private _initTagsChildControl() {
        return this._fb.group({
            name: ['', Validators.required]
        });
    }

    onAddPhotoUrl(event) {
        event.preventDefault();
        event.stopPropagation();
        this.photoUrlsControls.push(this._fb.control(null));
    }

    onRemovePhotoUrl(index: number) {
        event.preventDefault();
        event.stopPropagation();
        this.photoUrlsControls.removeAt(index);
    }

    onRemoveTag(index: number) {
        event.preventDefault();
        event.stopPropagation();
        const control = <FormArray>this.petForm.controls['tags'];
        control.removeAt(index);
    }

    onClearForm(): void { // sets the form into its pristine state (workaround)
        this._buildForm();
        this.formActive = false;
        setTimeout(()=> {
            this.formActive = true;
        }, 0);
    }

    ngOnInit(): void {
        console.log('ngOnInit pet-item component');

        this._router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                let currentRoute = this._route.root;
                while (currentRoute.children[0] !== undefined) {
                    currentRoute = currentRoute.children[0];
                }
                let id = currentRoute.snapshot.params['id'];
                if (id === 'new' && !this._userService.hasAuthority(['UNLIMITED_PRIVILEGE', 'UPDATE_PRIVILEGE', 'ADD_PRIVILEGE'])) {
                    this._router.navigate(['/access-denied']);
                }
            });

        this._loadCategories();
        this._loadPet();
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
                    this.categoriesLoading = false
                });
    }

    private _loadPet() {
        this.editPetLoading = true;
        var id = this._route.params.subscribe(params => {
            var id = +params["id"];
            console.log('_loadPet pet-item component id is: ' + id);

            this.title = id ? "Edit Pet" : "New Pet";

            if (!id) {
                this.editPetLoading = false;
                return;
            }

            this._petService.getPet(id)
                .subscribe(
                    pet => {
                        this.pet = pet;
                        this._initializeControls();
                    },
                    response => {
                        if (response.status == 404) {
                            this._router.navigate(['NotFound']);
                        }
                    },
                    ()=> {
                        this.editPetLoading = false;
                    });
        });
    }

    private _save() {
        this.savingLoading = true;
        var result;

        result = this.pet.id
            ? this._petService.updatePet(this.pet) : this._petService.addPet(this.pet);

        result.subscribe(x => {
                this._router.navigate(['pets']);
            },
            err=> {
                console.log(err);
                this.savingLoading = false;
            });
    }

    onSubmitForm(): void {
        this.submitted = true;
        //console.log(this.petForm.value);
        this.pet = new Pet(this.pet.id, this.petForm.value);
        this._save();
    }

    onCategoryChanged($event) {
        const value: string = (<HTMLSelectElement>$event.srcElement).value;
        this.currentCategory = this.categories.find((c: Category)=>c.id == +value);
        var control = this.petForm.get('category') as FormGroup;
        control.setValue(this.currentCategory);
    }

    onGoToPetsList() {
        this._router.navigate(['/pets']);
    }
}