import React from 'react';
import Tweet from './tweet.js';

const renderTimeline = (props, displayHandle) => {
    const obj = props.rawTimeline;
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
    }

    render() {
	const timeline = renderTimeline(this.props, true);
	return(
	    <div className="homeTimeline">
		<div className="homeTimelineHeader">
		    <button type="button" id="pullHomeTimeline" onClick={() => this.props.updateTimeline()}>Pull Home Timeline</button>
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
    }

    render() {
	const timeline = renderTimeline(this.props, false);
	return(
	    <div className="userTimeline">
		<div className="userTimelineHeader">
		    <button type="button" id="pullUserTimeline" onClick={() => this.props.updateTimeline()}>Pull User Timeline</button>
		    <div className="userTimelineTitle">User Timeline</div>
		</div>
		{timeline}
	    </div>
	);
    }
}
