const formatTimeline = (rawTimeline) => {
	const timelineDiv = document.getElementById("timeline");
	var innerTimelineDiv = document.getElementById("timeline-inner");
	
	timelineDiv.removeChild(innerTimelineDiv);
	innerTimelineDiv = document.createElement("div");
	innerTimelineDiv.id = "timeline-inner";

	tweets = JSON.parse(rawTimeline).forEach((tweet, i) => {
		const tweetDiv = document.createElement("div");
			if (i % 2 == 0) 
				tweetDiv.className = "tweet-style-one";
			else 		
				tweetDiv.className = "tweet-style-two";

			const profileDiv = document.createElement("div");
			profileDiv.className = "profile";

			const profileImg = document.createElement("img");
			profileImg.className = "profile-image";
			profileImg.src = tweet.user.profileImageUrl;
			profileDiv.appendChild(profileImg);

			const nameDiv = document.createElement("span");
			nameDiv.className = "name";
			nameDiv.innerHTML = tweet.user.name;
			profileDiv.appendChild(nameDiv);

			const handleDiv = document.createElement("span");
			handleDiv.className = "handle";
			handleDiv.innerHTML = tweet.user.handle;
			profileDiv.appendChild(handleDiv);

			tweetDiv.appendChild(profileDiv);

			const messageDiv = document.createElement("div");
			messageDiv.className = "message";
			
			const timestampSpan = document.createElement("span");
			const timestamp = new Date(tweet.createdAt);
			timestampSpan.className = "timestamp";

			const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			timestampSpan.innerText = months[timestamp.getMonth()] + " " + timestamp.getDay();
			messageDiv.appendChild(timestampSpan);

			const messageLink = document.createElement("a");
			messageLink.className = "message-link";
			messageLink.target = "_blank";
			messageLink.rel = "noopener noreferrer";
			messageLink.href = "https://twitter.com/" + tweet.user.handle + "/status/" + tweet.id;
			messageLink.innerHTML = tweet.message;
			messageDiv.appendChild(messageLink);

			tweetDiv.appendChild(messageDiv);

			innerTimelineDiv.appendChild(tweetDiv);
	});

	timelineDiv.appendChild(innerTimelineDiv);
}

const pullTimeline = () => { 
	var innerTimelineDiv = document.getElementById("timeline-inner");
	const endpoint = "http://localhost:8080/api/1.0/twitter/timeline"
	const xhttp = new XMLHttpRequest();
	xhttp.onload = () => {
		if (xhttp.status == 200) {
			formatTimeline(xhttp.responseText);
		} else if (xhttp.status == 500) {
			console.log(xhttp.responseText);
			innerTimelineDiv.innerHTML = "Pull timeline failed.";
		}
	};
	xhttp.onerror = () => {
		console.log("An error has occurred during attempt to make a request to ", endpoint);
		innerTimelineDiv.innerHTML = "An error has occurred. Please contact system administrator.";
	};

	xhttp.open("GET", endpoint, true);
	xhttp.send(); 
};

window.onload = () => { 
	pullTimeline();
	document.getElementById("pullTimeline").onclick = pullTimeline;
}