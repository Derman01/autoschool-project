import { FC } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { ListCar } from 'widgets/car';

interface PageOptions extends ComponentOptions {}

const Page: FC<PageOptions> = (options) => {
    const { className } = options;

    return (
        <div className={classNames(['page__car', className])}>
            <ListCar />
        </div>
    );
};

export default Page;
