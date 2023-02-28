import path from 'path';
import webpack from 'webpack';
import createConfig from './build/devConfig';
import { BUILD_MODE, BuildEnv, BuildOptions } from './build/types/config';

const config = (options: BuildEnv): webpack.Configuration => {

	const mode = options.mode || BUILD_MODE.Development;

	const buildOptions: BuildOptions = {
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			build: path.resolve(__dirname, '.build'),
			html: path.resolve(__dirname, 'public', 'index.html'),
			src: path.resolve(__dirname, 'src')
		},
		isDev: mode === BUILD_MODE.Development,
		mode,
		port: options.port || 3000
	};

	return createConfig(buildOptions);
}

export default config;
