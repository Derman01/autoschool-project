export interface ITeacher {
    id: string;
    name: string;
    surname: string;
    patronymic: string;
}

export default class InstructorModel implements ITeacher {
    public get title() {
        return `${this.surname} ${this.name} ${this.patronymic}`;
    }

    constructor(data: ITeacher) {
        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.patronymic = data.patronymic;
    }

    id: string;
    name: string;
    patronymic: string;
    surname: string;
}
