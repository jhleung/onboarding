const pullTimeline = () => { 
	const timelineDiv = document.getElementById("timeline");
	const endpoint = "http://localhost:8080/api/1.0/twitter/timeline"
	const xhttp = new XMLHttpRequest();
	xhttp.onload = () => {
		if (xhttp.status == 200) {
			console.log(xhttp.responseText);
			timelineDiv.innerHTML = xhttp.responseText;
		} else if (xhttp.status == 500) {
			console.log(xhttp.responseText);
			timelineDiv.innerHTML.innerHTML = "Pull timeline failed.";
		}
	};
	xhttp.onerror = () => {
	  	console.log("An error has occurred during attempt to make a request to ", endpoint);
		timelineDiv.innerHTML = "An error has occurred. Please contact system administrator.";
	};

	xhttp.open("GET", endpoint, true);
	xhttp.send(); 
};

window.onload = () => { 
	pullTimeline();
	document.getElementById("pullTimeline").onclick = pullTimeline;
}
