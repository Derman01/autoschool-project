import { Model } from 'shared/lib/source';

export class ModuleModel extends Model {
    public get title(): string {
        return this.name;
    }

    public get Description(): string {
        return this.description;
    }

    public get Hours(): number {
        return this.hours;
    }
}
