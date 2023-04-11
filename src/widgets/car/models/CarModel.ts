export interface ICard {
	id: string;
	name: string;
	reg_number: string
}

export class CarModel {
	constructor(data: ICard) {
		this.id = data.id;
		this.name = data.name;
		this.number = data.reg_number;
	}

	id: string;
	name: string;
	number: string;
}