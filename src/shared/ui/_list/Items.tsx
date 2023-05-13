import React from 'react';
import { TypeItem } from './Interface';
import { ActionButton, Actions } from 'widgets/action';

interface ItemOptions {
    className?: string;
    item: TypeItem;
    templateItem?: React.FC<TypeItem>;
    onClick?: (item: TypeItem) => void;
    actions?: Actions;
}

const Item: React.FC<ItemOptions> = (options) => {
    const { className, templateItem, onClick, item, actions } = options;

    const clickItemHandler = () => {
        if (onClick) {
            onClick(item);
        }
    };

    return (
        <div className={className} onClick={clickItemHandler}>
            {templateItem ? templateItem(item) : item.name}
            {actions && (
                <div className={'list__View_itemActions'}>
                    <ActionButton source={actions} item={item} />
                </div>
            )}
        </div>
    );
};

export default Item;
