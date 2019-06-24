export const pullTimeline = (endpoint) => {
    return new Promise((resolve, reject) => {
	fetch(endpoint).then((res) => {
	    if (res.status == 200) {
		resolve(res.json());
	    } else {
		reject(`Pull timeline failed.`);
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