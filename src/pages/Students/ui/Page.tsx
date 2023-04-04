import './styles/Page.scss';
import { FC, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { View } from 'shared/ui/list';
import { FILTER_GROUP_INITIAL_STATE, GROUP_ALL, SOURCE_GROUPS, SOURCE_STUDENTS } from './Constants';
import { ItemTemplateStudent } from './templates/ItemTemplateStudent';
import { Button } from 'shared/ui/buttons';
import { usePopup } from 'shared/hooks/usePopup';
import { PopupOpener } from 'shared/ui/popup';

interface PageOptions extends ComponentOptions {
}


export const Page: FC<PageOptions> = (options) => {
	const {className} = options;
	const [selectedGroup, setSelectedGroup] = useState('');
	const [filterStudents, setFilterStudents] = useState(FILTER_GROUP_INITIAL_STATE);

	const groupLoadCallback = (items: {name: string}[]) => {
		setSelectedGroup(items[0].name)
	};

	const changeFolderHandler = (item: { id: string, name: string }) => {
		setFilterStudents({
			group: item.id
		});
		setSelectedGroup(item.name);
	};

	const openPopupCreateGroup = () => {
		PopupOpener.createModal({
			templateOptions: {
				headerTitle: 'Добавление группы',
				width: 430,
				bodyContent: <div>Контент</div>
			}
		});
	};

	const openPopupCreateStudent = () => {
		PopupOpener.createModal({
			templateOptions: {
				headerTitle: 'Добавление студента',
				width: 430,
				bodyContent: <div>Контент</div>
			}
		});
	};

	return (
		<div className={classNames(['page__students', className])}>
			<div className='page__students_groups'>
				<div className="page__students_groups_header">
					<div className='page__students_groups_title'>
						Группы
					</div>
					<Button iconSize={'m'} icon={'plus'} onClick={openPopupCreateGroup}/>
				</div>

				<View source={SOURCE_GROUPS}
					  className={classNames('page__students_groups_list')}
					  dataLoadCallback={groupLoadCallback}
					  selectedChanged={changeFolderHandler}
					  minWidth={300}
					  keyProperty={'id'}
					  style={'master'}
					  templateItem={({name, count}: {name: string, count: number}) => (
						  <div className={'page__students_groups__item'}>
							  <div>{name}</div>
							  <div className={'page__students_groups__item_count'}>{count}</div>
						  </div>
					  )}
				/>
			</div>
			<div className="page__students_detail_container">
				<div className="page__students_detail_container_header">
					{
						<div className="page__students_detail_container_title">
							Группа
							<span className={'page__students_detail_container_title-name'}> {selectedGroup}</span>
						</div>
					}
					<Button icon={'plus'} iconSize={'m'} onClick={openPopupCreateStudent}/>
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
					  horizontalPaddings={'xs'}
					  templateItem={ItemTemplateStudent}
				/>
			</div>
		</div>
	);
};

export default Page;
