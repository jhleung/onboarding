import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';
import Tab from './components/tab.js';
import ReplyOverlay from './components/replyOverlay.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayReplyUI: false,
            tweet: null
        }

        this.toggleOverlayReplyUI = this.toggleOverlayReplyUI.bind(this);
    }

    toggleOverlayReplyUI(tweet) {
        this.setState({displayReplyUI: !this.state.displayReplyUI, tweet: tweet});
    }

    closeOverlayReplyUI() {
        if (this.state.displayReplyUI) {
            this.setState({displayReplyUI: false});
        }
    }

    render() {
        const tabClassName = `tabs ${this.state.displayReplyUI ? 'transparent' : ''}`;
        return(
            <div className="app">
    			<div className={tabClassName} onClick={() => this.closeOverlayReplyUI()}>
    				<Tab toggleOverlayReplyUI={this.toggleOverlayReplyUI}/>
    			</div>
                {this.state.displayReplyUI &&
                 <ReplyOverlay tweet={this.state.tweet} toggleOverlayReplyUI={this.toggleOverlayReplyUI} />}
    		</div>
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App />, document.getElementById("app"));
});
