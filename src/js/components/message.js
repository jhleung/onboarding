import React from 'react';

export default class Message extends React.Component {
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
