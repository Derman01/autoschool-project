import { FC } from 'react';
import { StudentModel } from '../../models/StudentModel';

export const ItemTemplateStudent: FC<StudentModel> = (student) => {
    return (
        <div className={'page__students_detail__item'}>
            <div className="page__students_detail__item_photo">
                {student.name[0] + student.surname[0]}
            </div>
            <div className="page__students_detail__item_info">
                <span className={'page__students_detail__item_infoName'}>
                    {student.getFullName}
                </span>
                <span className={'page__students_detail__item_infoGroup'}>
                    {student.group_name}
                </span>
            </div>
            <div className={'page__students_detail__item_category'}>
                <span>B</span>
            </div>
            <div className={'page__students_detail__item_category'}>
                <span>{student.payment_needed}</span>
            </div>
        </div>
    );
};
