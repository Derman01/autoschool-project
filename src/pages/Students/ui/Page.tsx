import './styles/Page.scss';
import { FC, useEffect, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { View } from 'shared/ui/list';
import {
	FILTER_GROUP_INITIAL_STATE, getStackCreateGroup, getStackCreateStudent,
	GROUP_ALL,
	GROUP_ALL_ID,
	SOURCE_GROUPS,
	SOURCE_STUDENTS
} from './Constants';
import { ItemTemplateStudent } from './templates/ItemTemplateStudent';
import { usePopup } from 'shared/hooks/usePopup';
import { useCommand } from 'shared/hooks/useCommand';

interface PageOptions extends ComponentOptions {
}


export const Page: FC<PageOptions> = (options) => {
	const {className} = options;
	const [filterStudents, setFilterStudents] = useState(FILTER_GROUP_INITIAL_STATE);
	const openPopup = usePopup(state => state.openPopup);

	useEffect(() => {
		const createGroupId = useCommand.subscribe('open-panel-create-group', () => {
			openPopup(getStackCreateGroup());
		});

		const createStudentId = useCommand.subscribe('open-panel-create-student', () => {
			openPopup(getStackCreateStudent());
		})
		return () => {
			useCommand.unsubscribe(createGroupId);
			useCommand.unsubscribe(createStudentId);
		}
	}, []);

	const groupLoadCallback = (items: object[]) => {
		items.unshift(GROUP_ALL);
	};

	const changeFolderHandler = (item: {id: string}) => {
		if (item.id === GROUP_ALL_ID) {
			setFilterStudents({});
		} else {
			setFilterStudents({
				group: item.id
			});
		}
	};


	return (
		<div className={classNames(['page__students', className])}>
			<View source={SOURCE_GROUPS}
					className={classNames('page__students_master')}
					dataLoadCallback={groupLoadCallback}
					selectedChanged={changeFolderHandler}
					minWidth={300}
					keyProperty={'id'}
					style={'master'}

			/>
			<View className={classNames('page__students_detail')}
					source={SOURCE_STUDENTS}
					canSelected={false}
					markerVisible={false}
					filter={filterStudents}
					templateItem={ItemTemplateStudent}
			/>
		</div>
	);
};

export default Page;
