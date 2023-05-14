import { forwardRef } from 'react';
import './styles/RichView.scss';
import { IViewRef } from './View';
import { ComponentOptions } from 'shared/types';
import { Container } from './Container';
import { Grid, GridOptions } from './Grid';

interface RichGridOptions extends ComponentOptions {
    contrastBackground?: boolean;
    headerTitle: string;
    addingCallback: () => void;
    gridOptions: GridOptions;
}

export const RichGrid = forwardRef<IViewRef, RichGridOptions>(
    (options, ref) => {
        const {
            className,
            headerTitle,
            addingCallback,
            gridOptions,
            contrastBackground = true,
        } = options;

        return (
            <Container
                className={className}
                headerTitle={headerTitle}
                contrastBackground={contrastBackground}
                addingCallback={addingCallback}
            >
                <Grid ref={ref} {...gridOptions} />
            </Container>
        );
    }
);
