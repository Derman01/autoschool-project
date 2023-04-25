import { ChangeEvent, FC, useCallback, useState } from 'react';
import './styles/Text.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';

interface TextOptions extends ComponentOptions {
    placeholder?: string;
}

export const Text: FC<TextOptions> = (options) => {
    const { className, placeholder } = options;
    const [focus, setFocus] = useState(false);
    const [visibleLabel, setVisibleLabel] = useState(false);

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
        <div className={classNames(['Text', className])}>
            <fieldset
                className={classNames('Text__fieldset', {
                    focus,
                })}
            >
                <legend
                    className={classNames('Text__legend', {
                        hidden: !visibleLabel,
                    })}
                >
                    {visibleLabel ? placeholder : <span>&nbsp;</span>}
                </legend>
                <input
                    className={'Text__input'}
                    type={'text'}
                    onBlur={onFocusOut}
                    onFocus={onFocusIn}
                    placeholder={visibleLabel ? '' : placeholder}
                />
            </fieldset>
        </div>
    );
};
