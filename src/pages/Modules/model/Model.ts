import { Model } from 'shared/lib/source';

export class ModuleModel extends Model {
    public get title(): string {
        return this.name;
    }
}
