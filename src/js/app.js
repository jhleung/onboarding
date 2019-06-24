import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';
import './components/helloReact.js';
import {HomeTimeline, UserTimeline} from './components/timeline.js';
import Error from './components/error.js';
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
	    console.log(responseText);
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
	let homeTimeline = this.state.homeTimelineErrorMsg != null ? <Error errorMsg={this.state.homeTimelineErrorMsg}/> : <HomeTimeline rawTimeline={this.state.homeTimeline}/>;
	let userTimeline = this.state.userTimelineErrorMsg != null ? <Error errorMsg={this.state.userTimelineErrorMsg}/> : <UserTimeline rawTimeline={this.state.userTimeline}/>;
	return(
	    <div className="app">
	       <div id="timeline">
		    <div className="homeTimeline">
			<div className="homeTimelineHeader">
			<button type="button" id="pullHomeTimeline" onClick={() => this.updateHomeTimeline()}>Pull Home Timeline</button>
			<div className="homeTimelineTitle">Home Timeline</div>
			</div>
			{homeTimeline}
		    </div>	
		    <div className="userTimeline">
			<div className="userTimelineHeader">
			<button type="button" id="pullUserTimeline" onClick={() => this.updateUserTimeline()}>Pull User Timeline</button>
			<div className="userTimelineTitle">User Timeline</div>
			</div>
			{userTimeline}
		    </div>	
		</div>
	    </div>
	);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App />, document.getElementById("app"));
});
