import { Model } from 'shared/lib/source';

export class ExamsModel extends Model {
    public get title() {
        return this.name;
    }
}
