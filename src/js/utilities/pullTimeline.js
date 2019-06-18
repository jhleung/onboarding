const pullTimeline = (success, error) => {
    const endpoint = "http://localhost:8080/api/1.0/twitter/timeline"
    const xhttp = new XMLHttpRequest();

    xhttp.onload = () => {
	if (xhttp.status == 200) {
	    success(xhttp.responseText);
	} else {
	    error("Pull timeline failed.");
	}
    };

    xhttp.onerror = () => {
	error(`An error has occurred during attempt to make a request to  ${endpoint}`);
    }

    xhttp.open("GET", endpoint, true);
    xhttp.send();
}

export default pullTimeline;
