import { BuildOptions } from './types/config';
import webpack from 'webpack';
import devRules from './devRules';
import devResolver from './devResolver';
import devPlugins from './devPlugins';
import devServer from './devServer';

const createConfig = (options: BuildOptions): webpack.Configuration => ({
	entry: options.paths.entry,
	mode: options.mode,
	devtool: options.isDev ? 'inline-source-map': undefined,
	module: {
		rules: devRules(options)
	},
	resolve: devResolver(options),
	output: {
		filename: '[name].[contenthash].js',
		path: options.paths.build,
		clean: true
	},
	plugins: devPlugins(options),
	devServer: devServer(options)
});

export default createConfig;