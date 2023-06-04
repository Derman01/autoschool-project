import { Model } from 'shared/lib/source';

export class CategoryModel extends Model {
    public get title(): string {
        return this.name;
    }
}
