interface ICategory {
    id: string;
    category: string;
}

export class CategoryModel implements ICategory {
    public get title() {
        return this.category;
    }

    constructor(data: ICategory) {
        this.id = data.id;
        this.category = data.category;
    }

    id: string;
    category: string;
}
