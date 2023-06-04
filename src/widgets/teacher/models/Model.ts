import { Model } from 'shared/lib/source';

export class TeacherModel extends Model {
    public get title(): string {
        return this.FullName;
    }

    public get FullName(): string {
        return `${this.surname} ${this.name} ${this.patronymic}`;
    }

    public get job(): string {
        return this.is_practician ? 'Инструктор по вождению' : 'Лектор';
    }

    public get PhoneNumber(): string {
        const [, a1, a2, a3, b1, b2, b3, c1, c2, d1, d2] = this.phone.split('');
        return `+7 (${a1 + a2 + a3}) ${b1 + b2 + b3} ${c1 + c2}-${d1 + d2}`;
    }
}
