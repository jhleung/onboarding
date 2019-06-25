import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';
import {HomeTimeline, UserTimeline} from './components/timeline.js';

export default class App extends React.Component {
    render() {
    return(
        <div className="app">
        <div id="timeline">
            <HomeTimeline />
            <UserTimeline />
         </div>
        </div>
    );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App />, document.getElementById("app"));
});
