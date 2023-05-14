import webpack from 'webpack';
import { BuildOptions } from './types/config';

const devRules = (options: BuildOptions): webpack.RuleSetRule[] => {
    const tsLoader: webpack.RuleSetRule = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const styleLoader: webpack.RuleSetRule = {
        test: /\.s[ac]ss$/i,
        use: [
            'styles-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (fileName: string) =>
                            !!fileName.includes('.models.'),
                        localIdentName: options.isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]',
                    },
                },
            },
            'sass-loader',
        ],
    };

    return [tsLoader, styleLoader];
};

export default devRules;
