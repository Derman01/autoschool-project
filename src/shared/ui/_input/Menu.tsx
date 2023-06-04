import {
    ChangeEvent,
    FC,
    memo,
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

export const Menu: FC<MenuOptions> = memo((options) => {
    const { source, onChange, value = 'null' } = options;

    const [filter, setFilter] = useState(options.filter);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState<string>(value);
    const fieldRef = useRef<FieldRef>(null);

    useEffect(() => {
        if (JSON.stringify(options.filter) !== JSON.stringify(filter)) {
            setFilter(options.filter);
            setSelectedItem('null');
            onChange(null);
        }
    }, [options.filter, filter, onChange]);

    useEffect(() => {
        source.query({ filter }).then((items: IItemData[]) => {
            setItems(items);
        });
    }, [source, filter]);

    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value;
            fieldRef.current.setVisibleLabel(value !== 'null');
            const formatValue = Number(value);
            setSelectedItem(value);
            onChange(Number.isNaN(formatValue) ? value : formatValue);
        },
        [onChange]
    );

    return (
        <Field
            ref={fieldRef}
            type={'custom'}
            {...options}
            fieldTemplate={
                <select className={'Field__input'} onChange={onChangeHandler}>
                    <option
                        disabled
                        value={'null'}
                        selected={selectedItem === 'null'}
                    >
                        {options.placeholder}
                    </option>
                    {items.length ? (
                        items.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                                selected={selectedItem === item.id}
                            >
                                {item.title}
                            </option>
                        ))
                    ) : (
                        <></>
                    )}
                </select>
            }
        />
    );
});
