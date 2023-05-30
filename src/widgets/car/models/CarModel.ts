import { Model } from 'shared/lib/source';

export interface ICard {
    id: string;
    name: string;
    reg_number: string;
}

export class CarModel extends Model {
    public get gearboxString(): string {
        if (this.gearbox_type) {
            return this.gearbox_type === 'auto' ? 'Автомат' : 'Механика';
        }
        return '';
    }
}
