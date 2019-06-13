import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';

class Timeline extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	const obj = JSON.parse(this.props.rawTimeline);
	let tweets = [];
	obj.forEach((tweet, i) => {
	    let className = i % 2 == 0 ? "tweet-style-one" : "tweet-style-two";
	    if (i == obj.length - 1)
		className += "-last-tweet";

	    tweets.push(<Tweet key={i} tweet={tweet} className={className}/>);
	});

	return(
	    <div id="timeline-inner">{tweets}</div>
	);
    }
}

class Tweet extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	return(
	    <div className={this.props.className}>
		<Profile profileImageUrl={this.props.tweet.user.profileImageUrl} userName={this.props.tweet.user.name} handle={this.props.tweet.user.handle}/>	
		<Message createdAt={this.props.tweet.createdAt} message={this.props.tweet.message} handle={this.props.tweet.user.handle} id={this.props.tweet.id}/>
	    </div>
	);
    }
}

class Profile extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	return(
	    <div className="profile">
		<img className="profile-image" src={this.props.profileImageUrl}/>
		<div className="name">{this.props.userName}</div>
		<div className="handle">{this.props.handle}</div>
	    </div>
	);
    }
}

class Message extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const date = new Date(this.props.createdAt);
	let timestamp = months[date.getMonth()] + " " + date.getDay();

	let tweetUrl = `https://twitter.com/${this.props.handle}/status/${this.props.id}`
	return(
	    <div className="message">
		<div className="timestamp">{timestamp}</div>
		<a className="message-link" target="_blank" rel="noopener noreferrer" href={tweetUrl}>{this.props.message}</a>
	    </div>
	);
    }
}

class Error extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	return(<div className="error">{this.props.errorMsg}</div>);
    }
}

class App extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    timeline: null,
	    errorMsg: null,
	    isError: true,
	};
    }

    componentWillMount() {
	this.pullTimeline();
    }

    pullTimeline() {
	const endpoint = "http://localhost:8080/api/1.0/twitter/timeline"
	const xhttp = new XMLHttpRequest();
	xhttp.onload = () => {
	    if (xhttp.status == 200) {
		this.state.timeline = xhttp.responseText;
		this.state.isError = false;
	    } else if (xhttp.status == 500) {
		console.log(xhttp.responseText);
		this.state.errorMsg = "Pull timeline failed.";
		this.state.isError = true;
	    }
	    this.setState(this.state);
	};

	xhttp.onerror = () => {
	    console.log(`An error has occurred during attempt to make a request to  ${endpoint}`);
	    this.state.errorMsg = "An error has occurred. Please contact system administrator.";
	    this.state.isError = true;
	    this.setState(this.state);
	};

	xhttp.open("GET", endpoint, true);
	xhttp.send(); 
    };

    render() {
	let timeline = this.state.isError ? <Error errorMsg={this.state.errorMsg}/> : <Timeline rawTimeline={this.state.timeline}/>
	    return(
		<div className="app">
		    <div id="header">
			<button type="button" id="pullTimeline" onClick={() => this.pullTimeline()}>Pull timeline</button>
		    </div>
		    <div id="timeline">{timeline}</div>	
		</div>
	    );
    }
}


class HelloReact extends React.Component {
    render() {
	return(<p>{"hello react!"}</p>);
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
ReactDOM.render(<HelloReact />, document.getElementById('hello-react'));
