export interface ITeacher {
	id: string;
	name: string;
	surname: string;
	patronymic: string;
	phone: string;
	job: string;
}

export default class TeacherModel implements ITeacher {

	public get FullName(): string {
		return `${this.surname} ${this.name} ${this.patronymic}`;
	}

	public get PhoneNumber(): string {
		const [, a1, a2, a3, b1, b2, b3, c1, c2, d1, d2] = this.phone.split('');
		return `+7 (${a1 + a2 + a3}) ${b1 + b2 + b3} ${c1 + c2}-${d1 + d2}`;
	}

	constructor(data: ITeacher) {
		this.id = data.id;
		this.name = data.name;
		this.surname = data.name;
		this.patronymic = data.patronymic;
		this.phone = data.phone;
		this.job = data.job;
	}

	id: string;
	name: string;
	patronymic: string;
	phone: string;
	surname: string;
	job: string;
}