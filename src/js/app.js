import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';
import './components/helloReact.js';
import {HomeTimeline, UserTimeline} from './components/timeline.js';
import {HomeTimelineError, UserTimelineError} from './components/error.js';
import {pullHomeTimeline, pullUserTimeline} from './services/pullTimeline.js';

export default class App extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    homeTimeline: null,
	    homeTimelineErrorMsg: '',
	    userTimeline: null,
	    userTimelineErrorMsg: '',
	};

	this.updateHomeTimeline = this.updateHomeTimeline.bind(this);
	this.updateUserTimeline = this.updateUserTimeline.bind(this);
    }

    componentWillMount() {
	this.updateHomeTimeline();
	this.updateUserTimeline();
    }

    updateHomeTimeline() {
	pullHomeTimeline('home').then((responseText) => {
	    this.state.homeTimeline = responseText;
	    this.state.homeTimelineErrorMsg = null;
	    this.setState(this.state);
	}).catch((error) => {
	    console.log(error);
	    this.state.homeTimelineErrorMsg = error;
	    this.setState(this.state);
	});
    };

    updateUserTimeline() {
	pullUserTimeline('user').then((responseText) => {
	    if (responseText.length == 0) {
		this.state.userTimelineErrorMsg = 'No tweets are available, post a tweet!';
	    } else {
		this.state.userTimeline = responseText;
		this.state.userTimelineErrorMsg = null;
	    }
	    this.setState(this.state);
	}).catch((error) => {
	    console.log(error);
	    this.state.userTimelineErrorMsg = error;
	    this.setState(this.state);
	});
    };

    render() {
	let homeTimeline = this.state.homeTimelineErrorMsg != null ? <HomeTimelineError errorMsg={this.state.homeTimelineErrorMsg}/> 
			    : <HomeTimeline rawTimeline={this.state.homeTimeline} updateTimeline={this.updateHomeTimeline}/>;
	let userTimeline = this.state.userTimelineErrorMsg != null ? <UserTimelineError errorMsg={this.state.userTimelineErrorMsg}/>
			    : <UserTimeline rawTimeline={this.state.userTimeline} updateTimeline={this.updateUserTimeline}/>;
						
	return(
	    <div className="app">
		<div id="timeline">
		    {homeTimeline} {userTimeline}
		</div>
	    </div>
	);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App />, document.getElementById("app"));
});
