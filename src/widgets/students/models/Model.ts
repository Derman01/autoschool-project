import { AnyObject, Model } from 'shared/lib/source';
import { getDateString } from 'shared/lib/helpers';

export class StudentModel extends Model {
    public get payment(): string {
        const payment = this.payments.length
            ? this.payments.reduce(
                  (a: AnyObject, b: AnyObject) =>
                      Number(a.value) + Number(b.value),
                  { value: 0 }
              )
            : 0;
        return `${payment}/${this.course_price}`;
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
