const OpenAPI = require('openapi-typescript-codegen');

const OPEN_API_URL = 'http://localhost:3030/api-docs-json';

const getApiDoc = async () => {
	await OpenAPI.generate({
		input: OPEN_API_URL,
		output: 'src/http-client/',
		useOptions: true,
	});
};

getApiDoc().then(() => console.log('Finished'));
