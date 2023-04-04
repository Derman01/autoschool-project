import { Server } from 'shared/lib/source';
import { StudentModel } from '../models/StudentModel';

export const SOURCE_GROUPS = new Server({
	endpoint: 'groups'
});

export const SOURCE_STUDENTS = new Server({
	endpoint: 'students',
	model: StudentModel
});

export const GROUP_ALL_ID = '0000';

export const GROUP_ALL = {
	id: GROUP_ALL_ID,
	name: 'Все'
};

interface FilterGroup {
	group: string;
}

export const FILTER_GROUP_INITIAL_STATE: FilterGroup | {} = {};