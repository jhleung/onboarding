import React from 'react';
import ReactDOM from 'react-dom';

class HelloReact extends React.Component {
  	render() {
    	return(<h1>{"hello react!"}</h1>);
  	}
}

ReactDOM.render(<HelloReact />, document.getElementById('hello-react'));