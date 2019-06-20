import pullTimeline from '../../js/services/pullTimeline.js';	

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

describe('Pull timeline', () => {
    const oldFetch = window.fetch;
    const endpoint = 'http://localhost:8080/api/1.0/twitter/timeline';

    afterEach(() => {
        window.fetch = oldFetch;
    });

    it('should make call to correct endpoint', async () => {
	const mockPromise = createMockPromiseResolved(200);
	window.fetch = jest.fn(() => mockPromise);
	await pullTimeline();
	expect(fetch).toHaveBeenCalledWith(endpoint);
    });

    it('should get success response from api call', async () => {
	const mockPromise = createMockPromiseResolved(200);
	window.fetch = jest.fn(() => mockPromise);
	await pullTimeline().then((res) => expect(res).toEqual('success'));
    });

    it('should get error response from api call', async () => {
	const mockPromise = createMockPromiseResolved(500);
	window.fetch = jest.fn(() => mockPromise);
	await pullTimeline().catch((res) => expect(res).toEqual('Pull timeline failed.'));
    });

    it('should get network error response', async () => {
	const mockPromise = createMockPromiseRejected();
	window.fetch = jest.fn(() => mockPromise);
	await pullTimeline().catch((res) => expect(res).toEqual(`An error has occurred during attempt to make a request to ${endpoint}`));
    });

});
