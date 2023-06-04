import { Model } from 'shared/lib/source';

export interface ICard {
    id: string;
    name: string;
    reg_number: string;
}

export class CarModel extends Model {
    public get Name(): string {
        return this.car_name;
    }

    public get Number(): string {
        return this.reg_number;
    }

    public get CategoryName(): string {
        return this.category_name;
    }

    public get CategoryDescription(): string {
        return this.category_description;
    }

    public get gearboxString(): string {
        if (this.gearbox_type) {
            return this.gearbox_type === 'auto' ? 'АКПП' : 'МКПП';
        }
        return 'Отсутствует';
    }

    public get isFree(): boolean {
        return !this.instructor_id;
    }

    public get Teacher(): string {
        return `${this.instructor_surname} ${this.instructor_name} ${this.instructor_patronymic}`;
    }
}
