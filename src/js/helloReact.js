import React from 'react';
import ReactDOM from 'react-dom';

class HelloReact extends React.Component {
  	render() {
    	return(<p>{"hello react!"}</p>);
  	}
}

ReactDOM.render(<HelloReact />, document.getElementById('hello-react'));