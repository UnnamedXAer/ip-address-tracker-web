/// <reference types="react-scripts" />

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_END: 'development' | 'production' | 'test';
		PUBLIC_URL: string;
		REACT_APP_API_URL: string;
		PORT: number;
		GENERATE_SOURCEMAP: boolean;
	}
}
