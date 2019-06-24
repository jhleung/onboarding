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
	return renderTimeline(this.props, true);
    }
}


export class UserTimeline extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	return renderTimeline(this.props, false);
    }
}
