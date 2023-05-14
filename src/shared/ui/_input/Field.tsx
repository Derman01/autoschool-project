import {
    ChangeEvent,
    forwardRef,
    useImperativeHandle,
    HTMLInputTypeAttribute,
    ReactElement,
    useCallback,
    useState,
    SetStateAction,
    Dispatch,
} from 'react';
import './styles/Field.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';

interface FieldOptions extends ComponentOptions {
    type: 'custom' | HTMLInputTypeAttribute;
    placeholder?: string;
    min?: string | number;
    max?: string | number;
    fieldTemplate?: ReactElement;
    value?: string;
    onChange?: (value: string) => void;
}

export interface FieldRef {
    setVisibleLabel: Dispatch<SetStateAction<boolean>>;
}

export const Field = forwardRef<FieldRef, FieldOptions>((options, ref) => {
    const {
        className,
        placeholder,
        type,
        min,
        max,
        fieldTemplate,
        value,
        onChange,
    } = options;

    const [focus, setFocus] = useState(false);
    const [visibleLabel, setVisibleLabel] = useState<boolean>(
        !!value || value === 'null'
    );

    useImperativeHandle(ref, () => ({
        setVisibleLabel,
    }));

    const onFocusOut = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setVisibleLabel(false);
        }
        setFocus(false);
    }, []);

    const onFocusIn = useCallback(() => {
        setVisibleLabel(true);
        setFocus(true);
    }, []);

    return (
        <div className={classNames(['Field', className])}>
            <fieldset
                className={classNames('Field__fieldset', {
                    focus,
                })}
            >
                <legend
                    className={classNames('Field__legend', {
                        hidden: !visibleLabel,
                    })}
                >
                    {visibleLabel ? placeholder : <span>&nbsp;</span>}
                </legend>
                {type === 'custom' ? (
                    fieldTemplate
                ) : (
                    <input
                        defaultValue={value}
                        className={'Field__input'}
                        onChange={(e) => onChange(e.target.value)}
                        type={visibleLabel ? type : 'text'}
                        min={min}
                        max={max}
                        onBlur={onFocusOut}
                        autoFocus={focus}
                        onFocus={onFocusIn}
                        placeholder={visibleLabel ? '' : placeholder}
                    />
                )}
            </fieldset>
        </div>
    );
});
