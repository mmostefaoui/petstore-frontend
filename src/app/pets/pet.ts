import * as _ from 'underscore';

export class Category {
    id: number;
    name: string;
}

export class Tag {
    id: number;
    name: string;
}

export class Pet {
    id: number;
    category = new Category();
    name: string;
    photoUrls: string[];
    tags: Tag[];
    status: string;

    constructor(id?: number, pet?: {category: Category, name: string, photoUrls: string[], tags: Tag[], status: string}) {
        if (pet) {
            _.assign(this, pet);
        }
        if (id) {
            this.id = id;
        }
    }
}

