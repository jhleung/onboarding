import React from 'react';
import Tweet from './tweet.js';

export default class Timeline extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	const obj = this.props.rawTimeline;
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
