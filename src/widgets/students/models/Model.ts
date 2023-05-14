import { Model } from 'shared/lib/source';

export class StudentModel extends Model {
    public get ShortName() {
        const names = this.name.split(' ');
        return `${this.surname} ${names[0]}.${names[1]}.`;
    }
    public get getFullName() {
        return `${this.surname} ${this.name} ${this.patronymic}`;
    }
}
