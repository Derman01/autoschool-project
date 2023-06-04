import { AnyObject, Model } from 'shared/lib/source';
import { ReactElement } from 'react';
import { ModuleModel } from 'widgets/modules';

export class CoursesModel extends Model {
    public get title(): string {
        return this.name;
    }

    public get Category(): string {
        return this.category_name;
    }

    public get Price(): string {
        return this.price;
    }

    public get LessonHours(): number {
        return this.modules
            .map((module: AnyObject) => module.hours)
            .reduce((a: number, b: number) => a + b, 0);
    }

    public get DrivingHours(): number {
        return this.driving_hours;
    }

    public get Instructor(): string {
        return `${this.instructor_surname} ${this.instructor_name} ${this.instructor_patronymic}`;
    }

    public get ModuleList(): ReactElement {
        return (
            <div
                style={{
                    display: 'grid',
                    gap: '10px',
                }}
            >
                {this.modules.map((module: AnyObject) => (
                    <div key={module.id}>{new ModuleModel(module).title}</div>
                ))}
            </div>
        );
    }
}
