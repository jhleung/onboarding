import React from 'react';

export default class Error extends React.Component {
    constructor(props) {
	super(props);
    }
    render() {
	return(<div className="error">{this.props.errorMsg}</div>);
    }
}
