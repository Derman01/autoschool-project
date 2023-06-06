import {
    FC,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import './styles/View.scss';
import { ComponentOptions } from 'shared/types';
import { TypeItem } from './Interface';
import { IData, IItemData } from 'shared/lib/_source/IData';
import Item from './Items';
import { classNames } from 'shared/lib/helpers';
import { Actions } from 'widgets/action';

export interface ViewOptions extends ComponentOptions {
    source: IData;
    filter?: object;
    style?: 'master' | 'list';
    keyProperty?: string;
    className?: string;
    minWidth?: number;
    canSelected?: boolean;
    autoSelected?: boolean;
    templateItem?: FC<TypeItem>;

    horizontalPaddings?: 'm' | 's' | 'xs' | '2xs' | 'l';
    selectedChanged?: (item: TypeItem) => void;
    dataLoadCallback?: (items: TypeItem) => void;
    actions?: Actions;
    canHover?: boolean;
}

export interface IViewRef {
    reload: () => Promise<any>;
}

export const View = forwardRef<IViewRef, ViewOptions>((options, ref) => {
    const {
        source,
        keyProperty = 'id',
        className,
        minWidth = 200,
        templateItem,
        dataLoadCallback,
        filter,
        autoSelected = true,
        style = 'list',
        canSelected = true,
        selectedChanged,
        canHover = true,
        horizontalPaddings = 'm',
        actions,
    } = options;

    useImperativeHandle(ref, () => ({
        reload: sourceQuery,
    }));

    const [selectedKey, setSelectedKey] = useState(null);
    const [items, setItems] = useState([]);

    const sourceQuery = useCallback(() => {
        return source.query({ filter }).then((items: IItemData[]) => {
            if (dataLoadCallback) {
                dataLoadCallback(items);
            }
            setItems(items);
            return items;
        });
    }, [filter]);

    useEffect(() => {
        sourceQuery().then((items) => {
            if (autoSelected) {
                setSelectedKey(items?.at(0)?.[keyProperty] || null);
            }
        });
    }, [filter]);

    const clickItemHandler = (item: TypeItem) => {
        const key = item[keyProperty];
        setSelectedKey(key);
        if (selectedChanged) {
            selectedChanged(item);
        }
    };

    return (
        <div
            className={classNames(['list__View', className])}
            style={{ minWidth: minWidth + 'px' }}
        >
            {' '}
            {items?.length ? (
                <div className={'list__View_container'}>
                    {items.map((item) => (
                        <Item
                            actions={actions}
                            key={item[keyProperty]}
                            item={item}
                            templateItem={templateItem}
                            onClick={clickItemHandler}
                            className={classNames(
                                'list__View_item',
                                {
                                    selected:
                                        item[keyProperty] === selectedKey &&
                                        canSelected,
                                    unselect: !canHover,
                                    horizontalPaddings,
                                },
                                [style]
                            )}
                        />
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
});
