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
import { AnyObject, IData, IItemData } from 'shared/lib/source';

interface MenuOptions extends ComponentOptions {
    placeholder?: string;
    source?: IData;
    onChange?: (value: any) => void;
    value?: any;
    filter?: AnyObject;
}

export const Checkbox: FC<MenuOptions> = (options) => {
    const { source, onChange, value = [], filter } = options;
    const [items, setItems] = useState([]);
    const fieldRef = useRef<FieldRef>(null);

    const needLock = filter.studying_start_date;
    let lockValue = needLock
        ? new Date(filter.studying_start_date).getDay()
        : 'undefind';

    const [selectedItems, setSelectedItems] = useState<string[]>(
        (() => {
            const selected = value.map((item: number) => item + '');
            if (needLock) {
                selected.push(lockValue + '');
            }
            return selected;
        })()
    );

    useEffect(() => {
        source.query({ filter }).then((items: IItemData[]) => {
            setItems(items);
            fieldRef.current?.setVisibleLabel(true);
        });
    }, [source, filter]);

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
                                disabled={needLock && item.id === lockValue}
                                type="checkbox"
                                id={item.id}
                                name={item.id}
                            />
                            <label
                                style={{
                                    width: '100%',
                                }}
                                htmlFor={item.id}
                            >
                                {item.title}
                            </label>
                        </div>
                    ))}
                </div>
            }
        />
    ) : (
        <div></div>
    );
};
