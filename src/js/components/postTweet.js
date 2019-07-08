import React from 'react';
import ReactDOM from 'react-dom';
import {publishTweet} from '../services/service.js';

export default class PostTweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tweet: '',
			successMsg: '',
			errorMsg: ''
		};
	}

	handleOnChange(e) {
		this.setState({tweet: e.target.value});
	};

	postTweet() {
		const message = this.state.tweet;
		if (message.length > 0) {
			publishTweet(message).then((responseText) => {
				this.setState({successMsg: responseText, errorMsg: ''});
			}).catch((error) => {
				console.log(error);
				this.setState({successMsg: '', errorMsg: error});
			})
		}
	}

	render() {
		const resultMsgClassName = `post-tweet-status ${this.state.errorMsg == '' ? 'post-tweet-status-success' : 'post-tweet-status-error'}`;
		const result = this.state.errorMsg == '' ? this.state.successMsg : this.state.errorMsg;
		return(
			<div className="post-tweet">
				<div className="post-tweet-input">
					<textarea className="tweet-message" maxLength="280" onChange={(e) => this.handleOnChange(e)}/>
					<div className="tweet-character-count">{this.state.tweet.length}</div>
				</div>
				<div className="post-tweet-footer">
					<div className={resultMsgClassName}>{result}</div>
					<div className="post-tweet-button-wrapper">
						<button className="post-tweet-button" onClick={() => this.postTweet()} disabled={this.state.tweet.length == 0}>Post Tweet</button>
					</div>
				</div>
			</div>
		);
	}
}