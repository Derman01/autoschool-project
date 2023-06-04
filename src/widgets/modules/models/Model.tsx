import { Model } from 'shared/lib/source';
import { ReactElement } from 'react';

export class ModuleModel extends Model {
    public get title(): ReactElement {
        return (
            <div
                style={{
                    display: 'grid',
                    gap: '10px',
                    gridAutoFlow: 'column',
                    gridTemplateColumns: '1fr 100px',
                    justifyContent: 'space-between',
                }}
            >
                <div>{this.name}</div>
                <div>Ак. часов: {this.Hours}</div>
            </div>
        );
    }

    public get Description(): string[] {
        return this.description.split('\n');
    }

    public get Hours(): number {
        return this.hours;
    }
}
