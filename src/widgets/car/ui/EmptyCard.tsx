import { FC } from 'react';
import './styles/Card.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { Button } from 'shared/ui/buttons';

interface CardOptions extends ComponentOptions {
    actionHandler: () => void;
}

const SVG = () => (
    <svg
        width="124"
        height="41"
        viewBox="0 0 124 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M24.4977 22.3794C19.5203 22.3794 15.4702 26.4158 15.4702 31.378C15.4702 36.3417 19.5189 40.3798 24.4977 40.3798C29.4733 40.3798 33.5237 36.3435 33.5237 31.378C33.5237 26.4172 29.4733 22.3794 24.4977 22.3794ZM24.4977 35.3788C22.2844 35.3788 20.4861 33.5846 20.4861 31.3777C20.4861 29.1743 22.2841 27.3801 24.4977 27.3801C26.7095 27.3801 28.5075 29.1743 28.5075 31.3777C28.5075 33.5829 26.7095 35.3788 24.4977 35.3788Z"
            fill="#3649F4"
            fillOpacity="0.15"
        />
        <path
            d="M99.4804 24.0037C94.9523 24.0037 91.27 27.6766 91.27 32.1892C91.27 36.7018 94.9541 40.3782 99.4804 40.3782C104.007 40.3782 107.691 36.7021 107.691 32.1892C107.691 27.6763 104.009 24.0037 99.4804 24.0037ZM99.4804 35.3789C97.7161 35.3789 96.2845 33.9482 96.2845 32.1892C96.2845 30.4337 97.7161 29.003 99.4804 29.003C101.241 29.003 102.676 30.4337 102.676 32.1892C102.676 33.9482 101.241 35.3789 99.4804 35.3789Z"
            fill="#3649F4"
            fillOpacity="0.15"
        />
        <path
            d="M87.4121 34.0759H35.9175V39.0769H87.4121V34.0759Z"
            fill="#3649F4"
            fillOpacity="0.15"
        />
        <path
            d="M121.393 19.3377L119.018 16.9727L114.481 14.8098L83.7519 11.9063L68.0028 0.620171H54.7596L37.9385 3.4733L18.3232 12.5104L13.6432 11.0192H0.96875V15.0891L4.86716 20.92L0.96875 23.5525V32.4265L4.47213 35.9175L8.01756 32.3843L5.98149 30.3544V26.207L11.8029 22.2782L7.61586 16.0185H12.8615L18.6542 17.8665L39.4377 8.2907L55.1834 5.62118H66.387L81.9284 16.7555L113.122 19.7012L116.08 21.1135L116.968 21.9954L117.934 25.1212L117.568 28.3951L114.65 32.7648L118.82 35.5405L122.418 30.1575L123.031 24.6383L121.393 19.3377Z"
            fill="#3649F4"
            fillOpacity="0.15"
        />
    </svg>
);

export const Card: FC<CardOptions> = (options) => {
    const { className, actionHandler } = options;

    return (
        <div className={classNames(['car__emptyCard', className])}>
            <div className="car__emptyCard_content">
                <SVG />
                <div className="car__emptyCard_footer">
                    <div>Добавить новый автомобиль</div>
                    <Button
                        onClick={actionHandler}
                        icon={'plus'}
                        viewMode={'icon'}
                        iconSize={'m'}
                    />
                </div>
            </div>
        </div>
    );
};
