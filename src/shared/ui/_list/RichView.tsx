import { forwardRef } from 'react';
import './styles/RichView.scss';
import { classNames } from 'shared/lib/helpers';
import { Button } from 'shared/ui/buttons';
import { ViewOptions, View, IViewRef } from './View';
import { ComponentOptions } from 'shared/types';

interface RichViewOptions extends ComponentOptions {
    contrastBackground?: boolean;
    headerTitle: string;
    addingCallback: () => void;
    listOptions: ViewOptions;
}

export const RichView = forwardRef<IViewRef, RichViewOptions>(
    (options, ref) => {
        const {
            className,
            headerTitle,
            addingCallback,
            listOptions,
            contrastBackground = true,
        } = options;

        return (
            <div
                className={classNames(['list__rich', className], {
                    contrastBackground,
                })}
            >
                <div className="list__rich_header">
                    <div className="list__rich_header_title">{headerTitle}</div>
                    <Button
                        icon={'plus'}
                        viewMode={'icon'}
                        iconSize={'m'}
                        onClick={() => {
                            addingCallback();
                        }}
                    />
                </div>
                <View
                    ref={ref}
                    horizontalPaddings={'xs'}
                    canSelected={false}
                    {...listOptions}
                />
            </div>
        );
    }
);
