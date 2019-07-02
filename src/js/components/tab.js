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
		const activeTabClassName = "tab-active";

		return (
			<div className="tab-wrapper">
				<nav className="tab-nav">
					<a className={this.state.activeTabIndex == 0 ? `tab-0 ${activeTabClassName}` : "tab-0"} 
						onClick={() => this.setActiveTabIndex(0)}>Home Timeline</a>	
					<a className={this.state.activeTabIndex == 1 ? `tab-1 ${activeTabClassName}` : "tab-1"} 
						onClick={() => this.setActiveTabIndex(1)}>User Timeline</a>
					<a className={this.state.activeTabIndex == 2 ? `tab-2 ${activeTabClassName}` : "tab-2"}  
						onClick={() => this.setActiveTabIndex(2)}>Post Tweet</a>
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

