export const pullTimeline = (endpoint) => {
    return new Promise((resolve, reject) => {
	fetch(endpoint).then((res) => {
	    if (res.status == 200) {
		resolve(res.json());
	    } else {
		reject('Pull timeline failed.');
	    }
	}).catch((err) => {
	    reject('An error has occurred. Please contact system administrator.');
	});
    });
}

export const pullHomeTimeline = () => {
    return pullTimeline('http://localhost:8080/api/1.0/twitter/homeTimeline');
}


export const pullUserTimeline = () => {
    return pullTimeline('http://localhost:8080/api/1.0/twitter/userTimeline');
}

export const filterTimeline = (endpoint) => {
    return new Promise((resolve, reject) => {
	fetch(endpoint).then((res) => {
	    if (res.status == 200) {
		const resClone = res.clone();
		res.text().then((responseText) => {
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
    return filterTimeline(`http://localhost:8080/api/1.0/homeTimeline/filter?keyword=${keyword}`);
}
