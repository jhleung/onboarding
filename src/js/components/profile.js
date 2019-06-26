import React from 'react';

export default class Profile extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	return(
	    <div className="profile">
		<img className="profile-image" src={this.props.profileImageUrl}/>
		<div className="name">{this.props.userName}</div>
		{this.props.displayHandle && <div className="handle">{this.props.handle}</div>}
	    </div>
	);
    }
}