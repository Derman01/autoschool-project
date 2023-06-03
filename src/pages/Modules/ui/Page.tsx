import { FC } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { ListModules } from 'widgets/modules';

interface PageOptions extends ComponentOptions {}

const Page: FC<PageOptions> = (options) => {
    const { className } = options;

    return (
        <div className={classNames(['pages-Modules__page', className])}>
            <ListModules />
        </div>
    );
};

export default Page;
