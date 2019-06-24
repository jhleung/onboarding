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

describe('Pull home timeline', () => {
    const oldFetch = window.fetch;
    const endpoint = 'http://localhost:8080/api/1.0/twitter/homeTimeline';

    afterEach(() => {
        window.fetch = oldFetch;
    });

    it('should make call to correct endpoint', async () => {
    const mockPromise = createMockPromiseResolved(200);
    window.fetch = jest.fn(() => mockPromise);
    await pullTimeline('home');
    expect(fetch).toHaveBeenCalledWith(endpoint);
    });

    it('should get success response from api call', async () => {
    const mockPromise = createMockPromiseResolved(200);
    window.fetch = jest.fn(() => mockPromise);
    await pullTimeline('home').then((res) => expect(res).toEqual('success'));
    });

    it('should get error response from api call', async () => {
    const mockPromise = createMockPromiseResolved(500);
    window.fetch = jest.fn(() => mockPromise);
    await pullTimeline('home').catch((res) => expect(res).toEqual('Pull home timeline failed.'));
    });

    it('should get network error response', async () => {
    const mockPromise = createMockPromiseRejected();
    window.fetch = jest.fn(() => mockPromise);
    await pullTimeline('home').catch((res) => expect(res).toEqual(`An error has occurred. Please contact system administrator.`));
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
    await pullTimeline('user');
    expect(fetch).toHaveBeenCalledWith(endpoint);
    });

    it('should get success response from api call', async () => {
    const mockPromise = createMockPromiseResolved(200);
    window.fetch = jest.fn(() => mockPromise);
    await pullTimeline('user').then((res) => expect(res).toEqual('success'));
    });

    it('should get error response from api call', async () => {
    const mockPromise = createMockPromiseResolved(500);
    window.fetch = jest.fn(() => mockPromise);
    await pullTimeline('user').catch((res) => expect(res).toEqual('Pull user timeline failed.'));
    });

    it('should get network error response', async () => {
    const mockPromise = createMockPromiseRejected();
    window.fetch = jest.fn(() => mockPromise);
    await pullTimeline('user').catch((res) => expect(res).toEqual(`An error has occurred. Please contact system administrator.`));
    });

});