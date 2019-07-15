import React from 'react';

export default class Message extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const date = new Date(this.props.tweet.createdAt);
		let timestamp = months[date.getMonth()] + " " + date.getDay();

		let tweetUrl = `https://twitter.com/${this.props.tweet.user.handle}/status/${this.props.tweet.id}`;
		return(
			<div className="message">
				<div className="timestamp">{timestamp}</div>
				<a className={`message-link tweety-href ${this.props.displayMessageLink ? '' : 'disable-message-link'}`} target="_blank" rel="noopener noreferrer" href={this.props.displayMessageLink ? tweetUrl : undefined}>{this.props.tweet.message}</a>
				{this.props.displayReplyButton && 
					<div className="reply-button-wrapper">
						<i className="fa fa-reply reply-button tweety-button" onClick={() => this.props.toggleOverlayReplyUI(this.props.tweet)}></i>
					</div>}
			</div>
		);
	}
}
