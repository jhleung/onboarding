const pullTimeline = (getResponseText) => {
    const endpoint = "http://localhost:8080/api/1.0/twitter/timeline"
    const xhttp = new XMLHttpRequest();
    let responsePromise = new Promise((resolve, reject) => {
	xhttp.onload = () => {
	    if (xhttp.status == 200) {
		resolve(xhttp.responseText);
	    } else {
		reject("Pull timeline failed.");
	    }
	};

	xhttp.onerror = () => {
	    reject(`An error has occurred during attempt to make a request to  ${endpoint}`);
	}
    });

    xhttp.open("GET", endpoint, true);
    xhttp.send();

    return responsePromise;
}

export {pullTimeline};
