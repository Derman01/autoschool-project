import { Model } from 'shared/lib/source';

export default class InstructorModel extends Model {
    public get title() {
        return `${this.surname} ${this.name} ${this.patronymic}`;
    }
}
