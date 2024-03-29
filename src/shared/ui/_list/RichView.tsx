import { forwardRef } from 'react';
import './styles/RichView.scss';
import { ViewOptions, View, IViewRef } from './View';
import { ComponentOptions } from 'shared/types';
import { Container } from './Container';

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
            <Container
                className={className}
                headerTitle={headerTitle}
                contrastBackground={contrastBackground}
                addingCallback={addingCallback}
            >
                <View
                    ref={ref}
                    horizontalPaddings={'xs'}
                    canSelected={false}
                    {...listOptions}
                />
            </Container>
        );
    }
);
