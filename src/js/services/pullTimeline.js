const pullTimeline = (timelineType) => {
    const endpoint = `http://localhost:8080/api/1.0/twitter/${timelineType}Timeline`;
    return new Promise((resolve, reject) => {
	fetch(endpoint).then((res) => {
	    if (res.status == 200) {
		resolve(res.json());
	    } else {
		reject(`Pull ${timelineType} timeline failed.`);
	    }
	}).catch((err) => {
	    reject(`An error has occurred during attempt to make a request to ${endpoint}`);
	});
    });
}

export default pullTimeline;