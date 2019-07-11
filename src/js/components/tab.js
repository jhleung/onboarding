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
		const tabClassName = 'tab';
		return (
			<div className="tab-wrapper">
				<nav className="tab-nav">
					<a className={`${tabClassName} tab-0 ${this.state.activeTabIndex == 0 ? activeTabClassName : ''}`} 
						onClick={() => this.setActiveTabIndex(0)}>Home Timeline</a>	
					<a className={`${tabClassName} tab-1 ${this.state.activeTabIndex == 1 ? activeTabClassName : ''}`} 
						onClick={() => this.setActiveTabIndex(1)}>User Timeline</a>
					<a className={`${tabClassName} tab-2 ${this.state.activeTabIndex == 2 ? activeTabClassName : ''}`}  
						onClick={() => this.setActiveTabIndex(2)}>Post Tweet</a>
				</nav>
				{this.state.activeTabIndex == 0 && <HomeTimeline toggleOverlayReplyUI={this.props.toggleOverlayReplyUI}/>}
				{this.state.activeTabIndex == 1 && <UserTimeline toggleOverlayReplyUI={this.props.toggleOverlayReplyUI}/>}
				{this.state.activeTabIndex == 2 && <PostTweet />}
			</div>
		);
	}
}

