export enum BUILD_MODE {
	Production = 'production',
	Development = 'development'
}

interface Paths {
	entry: string;
	build: string;
	html: string;
	src: string;
}

export interface BuildOptions {
	paths: Paths;
	mode: BUILD_MODE;
	isDev: boolean;
	port: number;
}

export interface BuildEnv {
	port: number;
	mode: BUILD_MODE;
}