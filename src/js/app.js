import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';
import './components/helloReact.js';
import Timeline from './components/timeline.js';
import Error from './components/error.js';
import pullTimeline from './services/pullTimeline.js';

export default class App extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    timeline: null,
	    errorMsg: null,
	    isError: true,
	};
    }

    componentWillMount() {
	this.handleOnClick();
    }

    handleOnClick() {
	pullTimeline().then((responseText) => {
		this.state.timeline = responseText;
		this.state.isError = false;
		this.setState(this.state);
	    }).catch((error) => {
		this.state.errorMsg = error;
		console.log(error);
		this.state.isError = true;
		this.setState(this.state);
	    });
    };

    render() {
	let timeline = this.state.isError ? <Error errorMsg={this.state.errorMsg}/> : <Timeline rawTimeline={this.state.timeline}/>;
	return(
	    <div className="app">
	    	<div id="header">
		    <button type="button" id="pullTimeline" onClick={() => this.handleOnClick()}>Pull timeline</button>
		</div>
	    	<div id="timeline">{timeline}</div>	
	    </div>
	);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App />, document.getElementById("app"));
});
