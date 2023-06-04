import { FC, forwardRef, ReactElement, useMemo } from 'react';
import './styles/Grid.scss';
import { ViewOptions, View, IViewRef } from './View';

export interface Caption {
    title: string | ReactElement;
    width: string;
}

export interface GridOptions extends ViewOptions {
    captions: Caption[];
    columns: FC[];
}

export const Grid = forwardRef<IViewRef, GridOptions>((options, ref) => {
    const { columns, captions, ...listOptions } = options;
    const gridTemplateColumns = useMemo(() => {
        return captions.map((caption) => caption.width).join(' ');
    }, []);

    return (
        <>
            <div
                className="list__grid__headers"
                style={{
                    gridTemplateColumns,
                }}
            >
                {captions.map((caption, index) => (
                    <div key={index}>{caption.title}</div>
                ))}
            </div>
            <View
                ref={ref}
                horizontalPaddings={'xs'}
                canSelected={false}
                {...listOptions}
                templateItem={(item) => (
                    <div
                        className={'list__grid__item'}
                        style={{
                            gridTemplateColumns,
                        }}
                    >
                        {columns.map((ItemTemplate, index) => (
                            <div key={index}>{ItemTemplate(item)}</div>
                        ))}
                    </div>
                )}
            />
        </>
    );
});
