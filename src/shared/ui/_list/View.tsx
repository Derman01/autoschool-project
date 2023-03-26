import { FC, useEffect, useState } from 'react';
import './styles/View.scss';
import { ComponentOptions } from 'shared/types';
import { TypeItem } from './Interface';
import { IData } from 'shared/lib/_source/IData';
import Item from './Items';
import { classNames } from 'shared/lib/helpers';

interface ViewOptions extends ComponentOptions {
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
}

export const View: FC<ViewOptions> = (options) => {
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
		horizontalPaddings = 'm'
	} = options;

	const [selectedKey, setSelectedKey] = useState(null);
	const [loading, setLoading] = useState(false);
	const [items, setItems] = useState([]);

	useEffect(() => {
		setLoading(true);
		source.query({filter}).then((items) => {
			if (dataLoadCallback) {
				dataLoadCallback(items);
			}
			setItems(items);
			setLoading(false);
			if (autoSelected) {
				setSelectedKey(items.at(0)?.[keyProperty] || null);
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
			style={{minWidth: minWidth + 'px'}}
		>
			{loading ? (
				<div>Loading...</div>
			) : items.length ? (
				<div className={'list__View_container'}>
					{
						items.map((item) => (
							<Item
								key={item[keyProperty]}
								item={item}
								templateItem={templateItem}
								onClick={clickItemHandler}
								className={classNames(
									'list__View_item',
									{
										selected: item[keyProperty] === selectedKey && canSelected,
										unselect: !canSelected,
										horizontalPaddings,
									},
									[style]
								)}
							/>
						))
					}
				</div>
			) : (
				<div>Пусто</div>
			)}
		</div>
	);
};
