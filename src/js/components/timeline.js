import React from 'react';
import ReactDOM from 'react-dom';
import Tweet from './tweet.js';
import Error from './error.js';
import {pullHomeTimeline, pullUserTimeline, filterHomeTimeline} from '../services/pullTimeline.js';

const renderTimeline = (timeline, displayHandle) => {
    const obj = timeline;
    let tweets = [];
    obj.forEach((tweet, i) => {
    let className = i % 2 == 0 ? "tweet-style-one" : "tweet-style-two";
    if (i == obj.length - 1)
        className += "-last-tweet";

    tweets.push(<Tweet key={i} tweet={tweet} className={className} displayHandle={displayHandle}/>);
    });

    return(
        <div id="timeline-inner">{tweets}</div>
    );
}

export class HomeTimeline extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    timeline: null,
	    errorMsg: '',
	    disableFilter: true
	};
        this.handleKeyDown = this.handleKeyDown.bind(this);

    }

    componentWillMount() {
	this.pullTimeline();
	document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnMount(){
	document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(e) {
    	if (!this.state.disableFilter && e.keyCode == 13) {
    	   this.filterTimeline();
    	}
    }

    disableFilter(e) {
        this.state.disableFilter = e.target.value == '';
        this.setState(this.state);
    }

    pullTimeline() {
	pullHomeTimeline().then((responseText) => {
	    this.state.timeline = responseText;
	    this.state.errorMsg = null;
	    this.setState(this.state);
	}).catch((error) => {
	    console.log(error);
	    this.state.errorMsg = error;
	    this.setState(this.state);
	});
    }
    
    filterTimeline() {
	const keyword = ReactDOM.findDOMNode(this).getElementsByClassName('filter-keyword')[0].value;
	filterHomeTimeline(keyword).then((responseText) => {
	    this.state.timeline = responseText;
	    this.state.errorMsg = null;
	    this.setState(this.state);
	}).catch((error) => {
	    this.state.errorMsg = error;
	    this.setState(this.state);
	});
    }

    render() {
	const timeline = this.state.errorMsg != null ? <Error errorMsg={this.state.errorMsg} /> : renderTimeline(this.state.timeline, true);
	return(
	    <div className="homeTimeline">
		<div className="homeTimelineHeader">
		    <div id="pullHomeTimeline">
			<button type="button" onClick={() => this.pullTimeline()}>Pull Home Timeline</button>
		    </div>
		    <div className="filterHomeTimeline">
			<input className="filter-keyword" onChange={(e) => this.disableFilter(e)}/><button onClick={() => this.filterTimeline()} disabled={this.state.disableFilter}>Filter</button>
		    </div>
		    <div className="homeTimelineTitle">Home Timeline</div>
		</div>
		{timeline}
	    </div>
	);
    }
}

export class UserTimeline extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    timeline: null,
	    errorMsg: '',
	};
    }

    componentWillMount() {
	this.pullTimeline();
    }

    pullTimeline() {
	pullUserTimeline().then((responseText) => {
	    if (responseText.length == 0) {
		this.state.errorMsg = 'No tweets are available, post a tweet!';
	    } else {
		this.state.timeline = responseText;
		this.state.errorMsg = null;
	    }
	    this.setState(this.state);
	}).catch((error) => {
	    console.log(error);
	    this.state.errorMsg = error;
	    this.setState(this.state);
	});
    };

    render() {
	const timeline = this.state.errorMsg != null ? <Error errorMsg={this.state.errorMsg} /> : renderTimeline(this.state.timeline, false);
	return(
	    <div className="userTimeline">
		<div className="userTimelineHeader">
		    <div id="pullUserTimeline">
			<button type="button" onClick={() => this.pullTimeline()}>Pull User Timeline</button>
		    </div>
		    <div className="userTimelineTitle">User Timeline</div>
		</div>
		{timeline}
	    </div>
	);
    }
}
