import { TDataForm } from 'shared/ui/_form/Menu';
import { Server } from 'shared/lib/_source/Server';
import { GroupModel } from '../../models/Model';
import { COURSES_SOURCE } from 'widgets/courses';
import { DayModel, TimeModel } from '../../models/Days';

export const GROUP_SOURCE = new Server({
    endpoint: 'groups',
    model: GroupModel,
});

export const GroupDataForm: TDataForm = [
    {
        id: 'course_id',
        type: 'menu',
        options: {
            placeholder: 'Курс',
            required: true,
            source: COURSES_SOURCE,
        },
    },
    {
        id: 'studying_start_date',
        type: 'date',
        options: {
            placeholder: 'Дата начала обучения',
            required: true,
        },
    },
    {
        id: 'timing_id',
        type: 'menu',
        options: {
            placeholder: 'Время обучения',
            required: true,
            source: new Server({
                endpoint: 'groups/availableTimings',
                model: TimeModel,
            }),
        },
        dependence: {
            id: 'studying_start_date',
            filterIds: ['studying_start_date', 'course_id'],
            convertFilter: ([studying_start_date, course_id]) => ({
                studying_start_date,
                course_id,
            }),
        },
    },
    {
        id: 'weekdays',
        type: 'checkbox',
        options: {
            placeholder: 'Дни недели',
            required: true,
            source: new Server({
                endpoint: 'groups/availableWeekdays',
                model: DayModel,
            }),
            conditionSuccess: (value: string[]) => value && value.length === 3,
        },
        dependence: {
            id: 'timing_id',
            filterIds: ['studying_start_date', 'course_id', 'timing_id'],
            convertFilter: ([studying_start_date, course_id, timing_id]) => ({
                timing_id,
                course_id,
                studying_start_date,
            }),
        },
    },
];
