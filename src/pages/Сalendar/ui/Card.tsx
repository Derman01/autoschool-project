import { FC, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { LessonModel } from '../models/Model';
import { Button } from 'shared/ui/buttons';
import { Info } from 'shared/ui/form';
import { usePopupContext } from 'shared/hooks/usePopupContext';

interface CardOptions extends ComponentOptions {
    lesson: LessonModel;
}

export const Card: FC<CardOptions> = (options) => {
    const { className } = options;
    const [lessonModel, setLessonModel] = useState(options.lesson);
    const { closePopup } = usePopupContext();

    return (
        <div className={classNames(['widget-module__Card', className])}>
            <Info
                data={[
                    {
                        title: 'Время проведения',
                        value: lessonModel.timing_time_interval,
                    },
                    {
                        title: 'Группа',
                        value: lessonModel.group_name,
                    },
                    {
                        title: 'Название',
                        value: lessonModel.title,
                    },
                    {
                        title: 'Описание',
                        value: (
                            <>
                                {lessonModel.module_description
                                    .split('\n')
                                    .map((row: string, index: number) => (
                                        <span key={index}>
                                            {row}
                                            <br />
                                        </span>
                                    ))}
                            </>
                        ),
                    },
                ]}
            />
            <div className="widget-module__Card_actions">
                {lessonModel.metadata === 'module' && (
                    <Button style={'danger'} title={'Перенести'} />
                )}
            </div>
        </div>
    );
};
