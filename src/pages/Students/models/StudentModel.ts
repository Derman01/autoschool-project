interface IStudent {
    id: string;
    payment_needed: number;
    group_id: 1;
    group_name: string;
    name: string;
    surname: string;
    birthday: string;
    photo_path: string;
    phone: string;
    address: string;
    studying_start_date: string;
    studying_end_date: string;
    examen_date: string;
    instructor_id: 1
}

export class StudentModel implements IStudent {
   public get ShortName() {
      const names = this.name.split(' ');
      return `${this.surname} ${names[0]}.${names[1]}.`;
   }

   constructor(data: IStudent) {
      this.surname = data.surname;
      this.name = data.name;
      this.group_name = data.group_name;
      this.payment_needed = data.payment_needed;
   }

   address: string;
   birthday: string;
   examen_date: string;
   group_id: 1;
   group_name: string;
   id: string;
   instructor_id: 1;
   name: string;
   payment_needed: number;
   phone: string;
   photo_path: string;
   studying_end_date: string;
   studying_start_date: string;
   surname: string;
}
