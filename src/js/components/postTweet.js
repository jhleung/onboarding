import React from 'react';
import ReactDOM from 'react-dom';
import {publishTweet, replyTweet} from '../services/service.js';

export default class PostTweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			successMsg: '',
			errorMsg: ''
		};
	}

	handleOnChange(e) {
		this.setState({message: e.target.value});
	};

	publishTweet() {
		const message = this.state.message;
		if (message.length > 0) {
			publishTweet(message).then((responseText) => {
				this.setState({successMsg: responseText, errorMsg: ''});
			}).catch((error) => {
				console.log(error);
				this.setState({successMsg: '', errorMsg: error});
			})
		}
	}

	replyTweet() {
		const message = this.state.message;
		if (message.length > 0) {
			replyTweet(message, this.props.inReplyToId).then((responseText) => {
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
					<div className="tweet-character-count">{this.state.message.length}</div>
				</div>
				<div className="post-tweet-footer">
					<div className={resultMsgClassName}>{result}</div>
					<div className="post-tweet-button-wrapper">
						<button className="post-tweet-button tweety-button" onClick={this.props.inReplyToId ? () => this.replyTweet() : () => this.publishTweet()} disabled={this.state.message.length == 0}>
							{this.props.inReplyToId ? 'Reply' : 'Post Tweet'}
						</button>
					</div>
				</div>
			</div>
		);
	}
}