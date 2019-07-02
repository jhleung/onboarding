import React from 'react';
import ReactDOM from 'react-dom';
import Tweet from './tweet.js';
import Error from './error.js';
import {publishTweet} from '../services/service.js';

export default class PostTweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tweet: '',
			result: '',
		};
	}

	handleOnChange(e) {
		this.state.tweet = e.target.value;
		this.setState(this.state);
	};

	postTweet() {
		const message = this.state.tweet;
		if (message.length > 0) {
			publishTweet(message).then((responseText) => {
				this.state.result = 'Success!';
				this.setState(this.state);
			}).catch((error) => {
				this.state.result = error;
				this.setState(this.state);
			})
		}
	}

	render() {
		return(
			<div className="post-tweet">
				<div className="post-tweet-input">
					<textarea className="tweet-message" maxLength="280" onChange={(e) => this.handleOnChange(e)}/>
					<div className="tweet-character-count">{this.state.tweet.length}</div>
				</div>
				<div className="post-tweet-footer">
					<div className="post-tweet-status">{this.state.result}</div>
					<div className="post-tweet-button-wrapper">
						<button className="post-tweet-button" onClick={() => this.postTweet()} disabled={this.state.tweet.length == 0}>Post Tweet</button>
					</div>
				</div>
			</div>
		);
	}
}