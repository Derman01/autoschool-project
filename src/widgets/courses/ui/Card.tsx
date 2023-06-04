import { FC, useCallback, useState } from 'react';
import './styles/Card.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { CoursesModel } from '../models/Model';
import { Button } from 'shared/ui/buttons';
import { Info } from 'shared/ui/form';
import { usePopupContext } from 'shared/hooks/usePopupContext';
import { deleteCourse, editCourse } from './helper';

interface CardOptions extends ComponentOptions {
    course: CoursesModel;
    afterUpdate: () => Promise<void>;
}

export const Card: FC<CardOptions> = (options) => {
    const { className, afterUpdate } = options;
    const [coursesModel, setCoursesModel] = useState(options.course);
    const { closePopup } = usePopupContext();

    const onEditHandler = useCallback(() => {
        editCourse(coursesModel, (item: CoursesModel) => {
            setCoursesModel(
                (module) =>
                    new CoursesModel({
                        ...module,
                        ...item,
                    })
            );
            return afterUpdate();
        });
    }, [coursesModel]);

    const onDeleteHandler = useCallback(() => {
        deleteCourse(coursesModel).then(() => {
            afterUpdate().then(() => {
                closePopup();
            });
        });
    }, [coursesModel]);

    return (
        <div className={classNames(['widget-module__Card', className])}>
            <Info
                data={[
                    {
                        title: 'Название',
                        value: coursesModel.name,
                    },
                    {
                        title: 'Категория',
                        value: (
                            <>
                                {coursesModel.Category}:{' '}
                                {coursesModel.category_description}
                            </>
                        ),
                    },
                    {
                        title: 'Инструктор',
                        value: coursesModel.Instructor,
                    },
                    {
                        title: 'Часов практики',
                        value: coursesModel.DrivingHours + '',
                    },
                    {
                        title: 'Часов лекций',
                        value: coursesModel.LessonHours + '',
                    },
                    {
                        title: 'Стоимость',
                        value: coursesModel.price,
                    },
                    {
                        title: 'Модули',
                        value: coursesModel.ModuleList,
                    },
                ]}
            />
            <div className="widget-module__Card_actions">
                <Button
                    style={'primary'}
                    title={'Редактировать'}
                    onClick={onEditHandler}
                />
                <Button
                    style={'danger'}
                    title={'Удалить'}
                    onClick={onDeleteHandler}
                />
            </div>
        </div>
    );
};
