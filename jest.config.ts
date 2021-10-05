import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	coveragePathIgnorePatterns: ['<rootDir>/src/styles'],
	setupFilesAfterEnv: ['<rootDir>/src/tests/helpers/setupTests.js'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
		'\\.(css|less|scss|sass)$': '<rootDir>/src/tests/helpers/styleMock.js',
	},
};

export default config;