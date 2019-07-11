import React from 'react';
import ReactDOM from 'react-dom';
import Tweet from './tweet.js';
import Error from './error.js';
import {pullHomeTimeline, pullUserTimeline, filterHomeTimeline} from '../services/service.js';

const renderTimeline = (timeline, displayHandle, displayReplyButton, toggleOverlayReplyUI) => {
	const obj = timeline;
	let tweets = [];
	obj.forEach((tweet, i) => {
		let className = i % 2 == 0 ? "tweet-style-one" : "tweet-style-two";
		if (i == obj.length - 1)
			className += "-last-tweet";

		tweets.push(<Tweet key={i} tweet={tweet} className={className} displayHandle={displayHandle} displayReplyButton={displayReplyButton} toggleOverlayReplyUI={toggleOverlayReplyUI}/>);
	});

	return(
		<div id="timeline-inner">{tweets}</div>
	);
}

export class HomeTimeline extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeline: null,
			errorMsg: '',
			filterKeyword: ''
		};
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentWillMount() {
		this.pullTimeline();
		document.addEventListener("keydown", this.handleKeyDown);
	}

	componentWillUnMount(){
		document.removeEventListener("keydown", this.handleKeyDown);
	}

	handleKeyDown(e) {
		if (this.state.filterKeyword.length > 0 && e.keyCode == 13) {
			this.filterTimeline();
		}
	}

	handleOnChange(e) {
		this.setState({filterKeyword: e.target.value});
	}

	pullTimeline() {
		pullHomeTimeline().then((responseText) => {
			this.setState({timeline: responseText, errorMsg: null});
		}).catch((error) => {
			console.log(error);
			this.setState({errorMsg: error});
		});
	}

	filterTimeline() {
		const keyword = this.state.filterKeyword;
		if (keyword.length > 0 && keyword != ' ') {
			filterHomeTimeline(keyword).then((responseText) => {
				this.setState({timeline: responseText, errorMsg: null});
			}).catch((error) => {
				this.setState({errorMsg: error});
			})
		}
	}

	render() {
		const timeline = this.state.errorMsg != null ? <Error errorMsg={this.state.errorMsg} /> : renderTimeline(this.state.timeline, true, false, this.props.toggleOverlayReplyUI);
		return(
			<div className="timeline">
				<div className="homeTimeline">
					<div className="timelineHeader">
						<div id="pullTimeline">
							<button className="pullTimelineButton" type="button" onClick={() => this.pullTimeline()}>Pull Home Timeline</button>
						</div>
						<div className="filterHomeTimeline">
							<input className="filter-keyword" onChange={(e) => this.handleOnChange(e)}/><button className="filterHomeTimelineButton" onClick={() => this.filterTimeline()} disabled={this.state.filterKeyword.length == 0}>Filter</button>
						</div>
					</div>
					{timeline}
				</div>
			</div>
		);
	}
}

export class UserTimeline extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			timeline: null,
			errorMsg: '',
		};
	}

	componentWillMount() {
		this.pullTimeline();
	}

	pullTimeline() {
		pullUserTimeline().then((responseText) => {
			if (responseText.length == 0) {
				this.state.errorMsg = 'No tweets are available, post a tweet!';
			} else {
				this.state.timeline = responseText;
				this.state.errorMsg = null;
			}
			this.setState(this.state);
		}).catch((error) => {
			console.log(error);
			this.state.errorMsg = error;
			this.setState(this.state);
		});
	};

	render() {
		const timeline = this.state.errorMsg != null ? <Error errorMsg={this.state.errorMsg} /> : renderTimeline(this.state.timeline, false, true, this.props.toggleOverlayReplyUI);
		return(
			<div className="timeline">
				<div className="userTimeline">
					<div className="timelineHeader">
						<div id="pullTimeline">
							<button className="pullTimelineButton" type="button" onClick={() => this.pullTimeline()}>Pull User Timeline</button>
						</div>
					</div>
					{timeline}
				</div>
			</div>
		);
	}
}
