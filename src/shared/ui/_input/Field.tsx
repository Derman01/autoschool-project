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
    visibleLabel?: boolean;
    patterns?: string[];
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
        patterns,
    } = options;

    const [valueState, setValueState] = useState(value || '');
    const [focus, setFocus] = useState(false);
    const [visibleLabel, setVisibleLabel] = useState<boolean>(
        options.visibleLabel || !!value || value === 'null'
    );

    useImperativeHandle(ref, () => ({
        setVisibleLabel,
    }));

    const onFocusOut = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (!e.target.value) {
                setVisibleLabel(false);
            }
            setFocus(false);
        },
        []
    );

    const onFocusIn = useCallback(() => {
        setVisibleLabel(true);
        setFocus(true);
    }, []);

    const onChangeValue = (value: string) => {
        let test = true;
        if (patterns) {
            value.split('').forEach((s, index) => {
                if (test && !new RegExp(patterns[index]).test(s)) {
                    test = false;
                }
            });
        }
        if (test) {
            setValueState(value);
            onChange(value);
        }
    };

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
                ) : type === 'textArea' ? (
                    <textarea
                        defaultValue={value}
                        className={'Field__input'}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onFocusOut}
                        autoFocus={focus}
                        onFocus={onFocusIn}
                        placeholder={visibleLabel ? '' : placeholder}
                    />
                ) : (
                    <input
                        defaultValue={value}
                        className={'Field__input'}
                        onChange={(e) => onChangeValue(e.target.value)}
                        type={visibleLabel ? type : 'text'}
                        value={valueState}
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
