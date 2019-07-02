import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';
import Tab from './components/tab.js';

export default class App extends React.Component {
    render() {
    return(
        <div className="app">
			<div id="tabs">
				<Tab />
			</div>
		</div>
    );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App />, document.getElementById("app"));
});
