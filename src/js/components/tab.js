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
		this.state.activeTabIndex = index;
		this.setState(this.state);
	}
	
	render() {
		const tabClassName = "tab";
		const activeTabClassName = "tab-active";

		return (
			<div className="tab-wrapper">
				<nav className="timeline-tab-nav">
					<button className={this.state.activeTabIndex == 0 ? activeTabClassName : tabClassName} 
						onClick={() => this.setActiveTabIndex(0)}>Home Timeline</button>	
					<button className={this.state.activeTabIndex == 1 ? activeTabClassName : tabClassName} 
						onClick={() => this.setActiveTabIndex(1)}>User Timeline</button>
					<button className={this.state.activeTabIndex == 2 ? activeTabClassName : tabClassName} 
						onClick={() => this.setActiveTabIndex(2)}>Post Tweet</button>
				</nav>
				<div className="timeline">
					{this.state.activeTabIndex == 0 && <HomeTimeline />}
					{this.state.activeTabIndex == 1 && <UserTimeline />}
				</div>
				{this.state.activeTabIndex == 2 && <PostTweet />}
			</div>
		);
	}
}

