export const fetchTimeline = (endpoint) => {
    return new Promise((resolve, reject) => {
	fetch(endpoint).then((response) => {
	    if (response.status == 200) {
		resolve(response.json());
	    } else {
		reject('Pull timeline failed.');
	    }
	}).catch((err) => {
	    reject('An error has occurred. Please contact system administrator.');
	});
    });
}

export const pullHomeTimeline = () => {
    return fetchTimeline('http://localhost:8080/api/1.0/twitter/homeTimeline');
}


export const pullUserTimeline = () => {
    return fetchTimeline('http://localhost:8080/api/1.0/twitter/userTimeline');
}

export const fetchFilterTimeline = (endpoint) => {
    return new Promise((resolve, reject) => {
	fetch(endpoint).then((response) => {
	    if (response.status == 200) {
		const resClone = response.clone();
		response.text().then((responseText) => {
		    if (responseText == 'No results were found') {
			reject(responseText);
		    } else {
			resolve(resClone.json());
		    }
		});
	    } else {
		reject('Filter timeline failed.');
	    }
	}).catch((err) => {
	    reject('An error has occurred. Please contact system administrator.');
	});
    });
}

export const filterHomeTimeline = (keyword) => {
    return fetchFilterTimeline(`http://localhost:8080/api/1.0/homeTimeline/filter?keyword=${keyword}`);
}
