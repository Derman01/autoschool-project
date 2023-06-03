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

export const Menu: FC<MenuOptions> = (options) => {
    const { source, onChange, value = 'null' } = options;
    const [items, setItems] = useState([]);
    const fieldRef = useRef<FieldRef>(null);

    useEffect(() => {
        source.query().then((items: IItemData[]) => {
            setItems(items);
        });
    }, [source]);

    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value;
            fieldRef.current.setVisibleLabel(value !== 'null');
            const formatValue = Number(value);
            onChange(Number.isNaN(formatValue) ? value : formatValue);
        },
        []
    );

    return items?.length ? (
        <Field
            ref={fieldRef}
            type={'custom'}
            {...options}
            fieldTemplate={
                <select
                    className={'Field__input'}
                    defaultValue={value}
                    onChange={onChangeHandler}
                >
                    <option disabled value={'null'}>
                        {options.placeholder}
                    </option>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.title}
                        </option>
                    ))}
                </select>
            }
        />
    ) : (
        <div></div>
    );
};
