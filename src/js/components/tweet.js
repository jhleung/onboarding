import React from 'react';
import Profile from './profile.js';
import Message from './message.js';

export default class Tweet extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className={this.props.className}>
				<Profile profileImageUrl={this.props.tweet.user.profileImageUrl} userName={this.props.tweet.user.name} handle={this.props.tweet.user.handle} displayHandle={this.props.displayHandle}/>	
				<Message createdAt={this.props.tweet.createdAt} message={this.props.tweet.message} handle={this.props.tweet.user.handle} id={this.props.tweet.id}/>
			</div>
		);
	}
}
