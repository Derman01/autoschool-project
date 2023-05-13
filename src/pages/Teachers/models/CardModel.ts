export interface ICar {
    id: string;
    name: string;
    reg_number: string;
}

export default class CarModel implements ICar {
    public get title(): string {
        return `${this.name} - ${this.reg_number}`;
    }

    constructor(data: ICar) {
        this.id = data.id;
        this.name = data.name;
        this.reg_number = data.reg_number;
    }

    id: string;
    name: string;
    reg_number: string;
}
