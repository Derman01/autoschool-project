import { Model } from 'shared/lib/source';

export class CoursesModel extends Model {
    public get title(): string {
        return `${this.name} - ${this.category} - ${this.price}`;
    }
}
