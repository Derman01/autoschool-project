import { FC } from 'react';
// import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { Button } from 'shared/ui/buttons';

interface PageOptions extends ComponentOptions {
}

const data = [{
	date: '25.11.2001',
	timeStart: '8_00',
	timeEnd: '8_30',
	place: '15 аудитория',
	type: 'Теория',
	group: 'B23-01'
}];

const NAMES_MONTH = [
	'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
];

const Page: FC<PageOptions> = (options) => {
	const {className} = options;
	const nowDate = new Date();
	const dateNumber = nowDate.getDate();
	const dateMonth = nowDate.getMonth();
	const dateYear = nowDate.getFullYear();

	return (
		<div className={classNames(['page__calendar', className])}>
			<div className="calendar">
				В разработке
				{/*<div className="calendar_header">*/}
				{/*	<div className="calendar_header_buttons">*/}
				{/*		<Button title={'Прошлая'}/>*/}
				{/*		<Button title={'Следующая'}/>*/}
				{/*	</div>*/}
				{/*	<div className="calendar_header_data">*/}
				{/*		{dateNumber} {NAMES_MONTH[dateMonth]} -*/}
				{/*	</div>*/}
				{/*</div>*/}
			</div>
		</div>
	);
};

export default Page;