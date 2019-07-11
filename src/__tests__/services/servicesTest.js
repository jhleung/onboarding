import {fetchTimeline, publishTweet} from '../../js/services/service.js';   

const createMockPromiseResolved = (status)=> {
	const response = jest.fn();
	response.status = status;
	response.json = jest.fn(() => 'success');
	return Promise.resolve(response);
}

const createMockPromiseRejected = ()=> {
	const response = jest.fn();
	return Promise.reject(response);
}

describe('Pull home timeline', () => {
	const oldFetch = window.fetch;
	const endpoint = 'http://localhost:8080/api/1.0/twitter/homeTimeline';

	afterEach(() => {
		window.fetch = oldFetch;
	});

	it('should make call to correct endpoint', async () => {
		const mockPromise = createMockPromiseResolved(200);
		window.fetch = jest.fn(() => mockPromise);
		await fetchTimeline(endpoint);
		expect(fetch).toHaveBeenCalledWith(endpoint);
	});

	it('should get success response from api call', async () => {
		const mockPromise = createMockPromiseResolved(200);
		window.fetch = jest.fn(() => mockPromise);
		await fetchTimeline(endpoint).then((res) => expect(res).toEqual('success'));
	});

	it('should get error response from api call', async () => {
		const mockPromise = createMockPromiseResolved(500);
		window.fetch = jest.fn(() => mockPromise);
		await fetchTimeline(endpoint).catch((res) => expect(res).toEqual('Pull timeline failed.'));
	});

	it('should get network error response', async () => {
		const mockPromise = createMockPromiseRejected();
		window.fetch = jest.fn(() => mockPromise);
		await fetchTimeline(endpoint).catch((res) => expect(res).toEqual(`An error has occurred. Please contact system administrator.`));
	});

});


describe('Pull user timeline', () => {
	const oldFetch = window.fetch;
	const endpoint = 'http://localhost:8080/api/1.0/twitter/userTimeline';

	afterEach(() => {
		window.fetch = oldFetch;
	});

	it('should make call to correct endpoint', async () => {
		const mockPromise = createMockPromiseResolved(200);
		window.fetch = jest.fn(() => mockPromise);
		await fetchTimeline(endpoint);
		expect(fetch).toHaveBeenCalledWith(endpoint);
	});

	it('should get success response from api call', async () => {
		const mockPromise = createMockPromiseResolved(200);
		window.fetch = jest.fn(() => mockPromise);
		await fetchTimeline(endpoint).then((res) => expect(res).toEqual('success'));
	});

	it('should get error response from api call', async () => {
		const mockPromise = createMockPromiseResolved(500);
		window.fetch = jest.fn(() => mockPromise);
		await fetchTimeline(endpoint).catch((res) => expect(res).toEqual('Pull timeline failed.'));
	});

	it('should get network error response', async () => {
		const mockPromise = createMockPromiseRejected();
		window.fetch = jest.fn(() => mockPromise);
		await fetchTimeline(endpoint).catch((res) => expect(res).toEqual(`An error has occurred. Please contact system administrator.`));
	});
});


describe('Push tweet', () => {
	const oldFetch = window.fetch;
	const oldHeaders = window.Headers;
	const endpoint = 'http://localhost:8080/api/1.0/twitter/tweet';

	afterEach(() => {
		window.fetch = oldFetch;
		window.Headers = oldHeaders;
	});

	it('should make call to correct endpoint', async () => {
		const mockPromise = createMockPromiseResolved(200);
		window.fetch = jest.fn(() => mockPromise);
		window.Headers = jest.fn();
		await publishTweet('test');
		expect(fetch).toHaveBeenCalledWith(endpoint, {"body": "message=test", "headers": {}, "method": "POST"});
	});

	it('should get success response from api call', async () => {
		const mockPromise = createMockPromiseResolved(200);
		window.fetch = jest.fn(() => mockPromise);
		window.Headers = jest.fn();
		await publishTweet('test').then((res) => expect(res).toEqual('Success'));
	});

	it('should get error response from api call', async () => {
		const mockPromise = createMockPromiseResolved(500);
		window.fetch = jest.fn(() => mockPromise);
		window.Headers = jest.fn();
		await publishTweet('test').catch((res) => expect(res).toEqual('Post tweet failed. Try again later.'));
	});

	it('should get network error response', async () => {
		const mockPromise = createMockPromiseRejected();
		window.fetch = jest.fn(() => mockPromise);
		window.Headers = jest.fn();
		await publishTweet('test').catch((res) => expect(res).toEqual(`An error has occurred. Please contact system administrator.`));
	});

});
