import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Pet} from "./pet";
import {HttpHelper} from "../shared/http-helper";
import {API_PETS_PATH, SERVER_ERROR, API_CATEGORIES_PATH, STORAGE_AUTHENTICATION_TOKEN}
                from "../shared/app.constants";
import {Response} from "@angular/http";

@Injectable()
export class PetService {

    constructor(private _httpHelper: HttpHelper) {
    }

    getPets(): Observable<Pet[]> {
        return this._httpHelper.get(API_PETS_PATH)
            .map((res: Response)=><Pet[]> res.json())
            //.do(data=>console.log(JSON.stringify(data)))
            .catch(this._handleError);
    };

    getPet(petId: number): Observable<Pet> {
        return this._httpHelper.get(this._getPetUrl(petId))
            .map(res => res.json());
    }

    addPet(pet: Pet) {
        return this._httpHelper.post(API_PETS_PATH, JSON.stringify(pet))
            .map(res => res.json());
    }

    updatePet(pet: Pet) {
        return this._httpHelper.put(this._getPetUrl(pet.id), JSON.stringify(pet))
            .map(res => res.json());
    }

    deletePet(petId: number) {
        return this._httpHelper.delete(this._getPetUrl(petId))
            .map(res => res.json());
    }

    getCategories() {
        return this._httpHelper.get(API_CATEGORIES_PATH)
            .map(res => res.json())
            //.do(data=> {console.log(JSON.stringify(data));})
            .catch(this._handleError);
    }

    private _handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || SERVER_ERROR);
    }

    private _getPetUrl(petId) {
        return API_PETS_PATH + "/" + petId;
    }
}
