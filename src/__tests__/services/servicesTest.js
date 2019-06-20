import pullTimeline from '../../js/services/pullTimeline.js';	

let open, onerror, send, status, onload;
const createMockXHR = ()=> {
    const mockXHR = {
	open: jest.fn(),
	responseText: 'success',
	send: jest.fn().mockImplementation(function(){   
	    onload = this.onload.bind(this);
	    onerror = this.onerror.bind(this);
	})
    }

    return mockXHR;
}

describe('Pull timeline', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest;
    const endpoint = 'http://localhost:8080/api/1.0/twitter/timeline';

    afterEach(() => {
        window.XMLHttpRequest = oldXMLHttpRequest;
    });

    it('should make call to correct endpoint', async () => {
	const mockXHR = createMockXHR();
	window.XMLHttpRequest = jest.fn(() => mockXHR);
	await pullTimeline((responseText) => {}, (error) => {});
	expect(mockXHR.send).toHaveBeenCalled();
	expect(mockXHR.open).toHaveBeenCalledWith("GET", endpoint, true);
    });

    it('should get success response from api call', async () => {
	const mockXHR = createMockXHR();
	mockXHR.status = 200;
	window.XMLHttpRequest = jest.fn(() => mockXHR);
	let successMsg;
	await pullTimeline((responseText) => successMsg = responseText, jest.fn());
	mockXHR.onload();
	expect(successMsg).toEqual('success');
    });

    it('should get error response from api call', async () => {
	const mockXHR = createMockXHR();
	mockXHR.status = 500;
	window.XMLHttpRequest = jest.fn(() => mockXHR);
	let errorMsg;
	await pullTimeline(jest.fn(), (error) => errorMsg = error);
	mockXHR.onload();
	expect(errorMsg).toEqual('Pull timeline failed.');
    });

    it('should get network error response', async () => {
	const mockXHR = createMockXHR();
	window.XMLHttpRequest = jest.fn(() => mockXHR);
	let errorMsg;
	await pullTimeline(jest.fn(), (error) => errorMsg = error);
	mockXHR.onerror();
	expect(errorMsg).toEqual(`An error has occurred during attempt to make a request to ${endpoint}`);
    });

});
