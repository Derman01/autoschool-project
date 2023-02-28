import type { Configuration as DevServerConfiguration} from 'webpack-dev-server';
import { BuildOptions } from './types/config';
const devServer = (options: BuildOptions): DevServerConfiguration => ({
	open: options.isDev || undefined,
	port: options.isDev ? options.port : undefined,
	historyApiFallback: true
});

export default devServer;
