import { FC } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { View } from 'shared/ui/list';
import { Server } from 'shared/lib/source';
import './styles/Page.scss';

interface PageOptions extends ComponentOptions {
}

interface ItemStudent {
	id: string;
	name: string;
	groupName: string;
	payment: string;

}

const DetailItem: FC<ItemStudent> = (options) => {
	return (
			<div className={'page__students_detail__item'}>
				<div className="photo">ТД</div>
				<div className="page__students_detail__item_info">
                <span className={'page__students_detail__item_infoName'}>
                    {options.name}
                </span>
					<span className={'page__students_detail__item_infoGroup'}>
                    {options.groupName}
                </span>
				</div>
				<div className={'page__students_detail__item_payment'}>
					<span>{options.payment}</span>
				</div>
			</div>
	);
}

export const Page: FC<PageOptions> = (options) => {
	const {className} = options;

	const sourceCategory = new Server({
		endpoint: 'groups'
	});

	const sourceStudents = new Server({
		endpoint: 'students'
	});

	return (
		<div className={classNames(['page__students', className])}>
			<View source={sourceCategory}
				  className={classNames('page__students_master')}
				  minWidth={300}
				  keyProperty={'id'}
				  style={'master'}

			/>
			<View className={classNames('page__students_detail')}
				  source={sourceStudents}
				  canSelected={false}
				  markerVisible={false}
				  templateItem={DetailItem}
			/>
		</div>
	);
};

export default Page;
