import React from 'react';
import Profile from './profile.js';
import Message from './message.js';
import PostTweet from './postTweet.js'

export default class ReplyOverlay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
             <div className="reply-overlay">
                <Profile profileImageUrl={this.props.tweet.user.profileImageUrl} userName={this.props.tweet.user.name} handle={this.props.tweet.user.handle} displayHandle={this.props.displayHandle}/> 
                <Message tweet={this.props.tweet} toggleOverlayReplyUI={this.props.toggleOverlayReplyUI} displayReplyButton={false}/>
                <PostTweet inReplyToId={this.props.tweet.id}/>
                <button className="cancel-reply" onClick={() => this.props.toggleOverlayReplyUI()}>Cancel</button>
                <i className="fa fa-close cancel-reply-x" onClick={() => this.props.toggleOverlayReplyUI()}></i>
             </div>
        );
    }
}