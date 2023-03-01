import {FC} from 'react';
import {StudentModel} from '../../models/StudentModel';

export const ItemTemplateStudent: FC<StudentModel> = (student) => {
	return (
		<div className={'page__students_detail__item'}>
			<div className="photo">ТД</div>
			<div className="page__students_detail__item_info">
                <span className={'page__students_detail__item_infoName'}>
                    {student.ShortName}
                </span>
				<span className={'page__students_detail__item_infoGroup'}>
					Группа {student.group_name}
                </span>
			</div>
			<div className={'page__students_detail__item_payment'}
				  title={'Задолженность ' + student.payment_needed + ' руб.'}>
				<span>{student.payment_needed} руб.</span>
			</div>
		</div>
	);
};
