import {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { ComponentOptions } from 'shared/types';
import { Field, FieldRef } from './Field';
import { IData, IItemData } from 'shared/lib/source';

interface MenuOptions extends ComponentOptions {
    placeholder?: string;
    source?: IData;
    onChange?: (value: any) => void;
    value?: any;
}

export const Checkbox: FC<MenuOptions> = (options) => {
    const { source, onChange, value = [] } = options;
    const [items, setItems] = useState([]);
    const fieldRef = useRef<FieldRef>(null);

    const [selectedItems, setSelectedItems] = useState<string[]>(
        value.map((item: number) => item + '')
    );

    useEffect(() => {
        source.query().then((items: IItemData[]) => {
            setItems(items);
            fieldRef.current?.setVisibleLabel(true);
        });
    }, [source]);

    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const id = event.target.id;
            const value = event.target.checked;
            let newItems;
            if (value) {
                newItems = [...selectedItems, id];
            } else {
                newItems = [...selectedItems].filter((item) => item !== id);
            }
            onChange(newItems);
            setSelectedItems(newItems);
        },
        [selectedItems]
    );

    return items?.length ? (
        <Field
            visibleLabel={true}
            ref={fieldRef}
            type={'custom'}
            {...options}
            fieldTemplate={
                <div className={'Field__input Field__checkbox'}>
                    {items.map((item) => (
                        <div key={item.id} className={'Field__checkbox__item'}>
                            <input
                                onChange={onChangeHandler}
                                checked={selectedItems.includes(item.id + '')}
                                type="checkbox"
                                id={item.id}
                                name={item.id}
                            />
                            <label htmlFor="scales">{item.title}</label>
                        </div>
                    ))}
                </div>
            }
        />
    ) : (
        <div></div>
    );
};
