const formatTimeline = (timeline) => {
	tweets = JSON.parse(timeline).forEach((tweet, i) => {
		const timeline = document.createElement("div");

		if (i % 2 == 0) 
			timeline.style.backgroundColor="lightsteelblue";

		const profileImg = document.createElement("img");
		profileImg.src = tweet.profileImageUrl;
		timeline.appendChild(profileImg);

		const timestampSpan = document.createElement("span");
		const timestamp = new Date(tweet.createdAt);
		timestampSpan.innerText = timestamp.getFullYear() + "-" + timestamp.getMonth() + "-" + timestamp.getDay() + " " + timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
		timeline.appendChild(timestampSpan);

		const message = document.createElement("a");
		message.target = "_blank";
		message.rel = "noopener noreferrer";
		message.href = "https://twitter.com/" + tweet.handle + "/status/" + tweet.id;
		message.innerHTML = tweet.message;
		timeline.appendChild(message);

		document.getElementById("timeline").appendChild(timeline);
	})
}

const pullTimeline = () => { 
	const endpoint = "http://localhost:8080/api/1.0/twitter/timeline"
	const xhttp = new XMLHttpRequest();
	xhttp.onload = () => {
		if (xhttp.status == 200) {
			formatTimeline(xhttp.responseText);
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