import './styles/Page.scss';
import { FC, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { View } from 'shared/ui/list';
import {
	FILTER_GROUP_INITIAL_STATE,
	GROUP_ALL,
	GROUP_ALL_ID,
	SOURCE_GROUPS,
	SOURCE_STUDENTS
} from './Constants';
import { ItemTemplateStudent } from './templates/ItemTemplateStudent';
import { Button } from 'shared/ui/buttons';

interface PageOptions extends ComponentOptions {
}


export const Page: FC<PageOptions> = (options) => {
	const {className} = options;
	const [selectedGroup, setSelectedGroup]  = useState('');
	const [filterStudents, setFilterStudents] = useState(FILTER_GROUP_INITIAL_STATE);

	const groupLoadCallback = (items: object[]) => {
		items.unshift(GROUP_ALL);
	};

	const changeFolderHandler = (item: {id: string, name: string}) => {
		if (item.id === GROUP_ALL_ID) {
			setFilterStudents({});
			setSelectedGroup('')
		} else {
			setFilterStudents({
				group: item.id
			});
			setSelectedGroup(item.name);
		}
	};

	return (
		<div className={classNames(['page__students', className])}>
			<div className='page__students_groups'>
				<div className="page__students_groups_header">
					<div className='page__students_groups_title'>
						Группы
					</div>
					<Button iconSize={'m'} icon={'plus'}/>
				</div>

				<View source={SOURCE_GROUPS}
					  className={classNames('page__students_groups_list')}
					  dataLoadCallback={groupLoadCallback}
					  selectedChanged={changeFolderHandler}
					  minWidth={300}
					  keyProperty={'id'}
					  style={'master'}

				/>
			</div>
			<div className="page__students_detail_container">
				<div className="page__students_detail_container_header">
					{
						selectedGroup
							?
							<div className="page__students_detail_container_title">
								Группа
								<span className={'page__students_detail_container_title-name'}> {selectedGroup}</span>
							</div>
							:
							<div className="page__students_detail_container_title">
								Все группы
							</div>
					}
					<Button icon={'plus'} iconSize={'m'}/>
				</div>
				<div className="page__students_detail_headers">
					<div>ФИО</div>
					<div>Категории прав</div>
					<div>Оплата</div>
				</div>
				<View className={classNames('page__students_detail')}
					  source={SOURCE_STUDENTS}
					  canSelected={false}
					  filter={filterStudents}
					  horizontalPaddings={'2xs'}
					  templateItem={ItemTemplateStudent}
				/>
			</div>
		</div>
	);
};

export default Page;
