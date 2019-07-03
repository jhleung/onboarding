import React from 'react';
import ReactDOM from 'react-dom';
import {HomeTimeline, UserTimeline} from './timeline.js';
import PostTweet from './postTweet.js';

export default class Tab extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			activeTabIndex: 0,
			result: ''
		};
	}

	setActiveTabIndex(index) {
		this.setState({activeTabIndex: index});
	}
	
	render() {
		const activeTabClassName = 'tab-active';
		return (
			<div className="tab-wrapper">
				<nav className="tab-nav">
					<a className={`tab-0 ${this.state.activeTabIndex == 0 ? activeTabClassName : ''}`} 
						onClick={() => this.setActiveTabIndex(0)}>Home Timeline</a>	
					<a className={`tab-1 ${this.state.activeTabIndex == 1 ? activeTabClassName : ''}`} 
						onClick={() => this.setActiveTabIndex(1)}>User Timeline</a>
					<a className={`tab-2 ${this.state.activeTabIndex == 2 ? activeTabClassName : ''}`}  
						onClick={() => this.setActiveTabIndex(2)}>Post Tweet</a>
				</nav>
				<div className="timeline">
					{this.state.activeTabIndex == 0 && <HomeTimeline />}
					{this.state.activeTabIndex == 1 && <UserTimeline />}
				</div>
				<div className="post-tweet-wrapper">
					{this.state.activeTabIndex == 2 && <PostTweet />}
				</div>
			</div>
		);
	}
}

