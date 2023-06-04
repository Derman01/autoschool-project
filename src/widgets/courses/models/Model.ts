import { Model } from 'shared/lib/source';

export class CoursesModel extends Model {
    public get title(): string {
        return this.name;
    }

    public get Category(): string {
        return this.category_name;
    }

    public get Price(): string {
        return this.price;
    }
}
