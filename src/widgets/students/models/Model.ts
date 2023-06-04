import { AnyObject, Model } from 'shared/lib/source';
import { getDateString } from 'shared/lib/helpers';

export class StudentModel extends Model {
    public get payment(): string {
        const payment: number = this.payments.length
            ? this.payments
                  .map((value: AnyObject) => value.value)
                  .reduce((a: string, b: string) => Number(a) + Number(b), 0)
            : 0;
        return Math.round((payment * 100) / this.course_price) + '%';
    }

    public get nextPayment(): string {
        const start = new Date(this.group_studying_start_date).getTime();
        const end = new Date(this.group_studying_end_date).getTime();

        const nextTime = start + (end - start) / 2;
        return getDateString(new Date(nextTime));
    }

    public get ShortName() {
        const names = this.name.split(' ');
        return `${this.surname} ${names[0]}.${names[1]}.`;
    }
    public get getFullName() {
        return `${this.surname} ${this.name} ${this.patronymic}`;
    }
}
