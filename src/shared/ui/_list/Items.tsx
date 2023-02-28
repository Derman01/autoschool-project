import React from 'react';
import { TypeItem } from './Interface';

interface ItemOptions {
	className?: string;
	item: TypeItem;
	templateItem?: React.FC<TypeItem>;
	onClick?: (item: TypeItem) => void;
}

const Item: React.FC<ItemOptions> = (options) => {
	const {
		className,
		templateItem,
		onClick,
		item
	} = options;

	const clickItemHandler = () => {
		if (onClick) {
			onClick(item);
		}
	};

	return (
		<div className={className}
			 onClick={clickItemHandler}
		>
			{
				templateItem
					? templateItem(item)
					: item.name
			}
		</div>
	);
};

export default Item;