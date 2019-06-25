import React from 'react';

const renderError = (props) => {
    const obj = props.rawTimeline;
    return(
       <div className="error">{props.errorMsg}</div>
    );
}

export class HomeTimelineError extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
    const error = renderError(this.props);
	return(
	    <div className="homeTimelineError">{error}</div>
	);
    }
}

export class UserTimelineError extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
    const error = renderError(this.props);
	return(
	    <div className="userTimelineError">{error}</div>
	);
    }
}
