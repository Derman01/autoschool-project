import { Model, AnyObject } from 'shared/lib/source';

export class StudentModel extends Model {
    public get payment_needed(): number {
        const payment = this.payments.length
            ? this.payments.reduce(
                  (a: AnyObject, b: AnyObject) =>
                      Number(a.value) + Number(b.value),
                  { value: 0 }
              )
            : 0;
        return Number(this.course_price) - payment;
    }

    public get ShortName() {
        const names = this.name.split(' ');
        return `${this.surname} ${names[0]}.${names[1]}.`;
    }
    public get getFullName() {
        return `${this.surname} ${this.name} ${this.patronymic}`;
    }
}
