export class StudentModel {
    [key: string | number]: any;
    public get ShortName() {
        const names = this.name.split(' ');
        return `${this.surname} ${names[0]}.${names[1]}.`;
    }

    public get getFullName() {
        return `${this.surname} ${this.name} ${this.patronymic}`;
    }

    constructor(data: { [key: string | number]: any }) {
        Object.keys(data).forEach((key: string | number) => {
            this[key] = data[key];
        });
    }
}
