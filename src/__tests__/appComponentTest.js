import React from 'react';
import {shallow} from 'enzyme';
import App from '../js/app.js';


describe('App component', () => {
    App.prototype.handleOnClick = jest.fn();
    it('should render app', () => {
	const wrapper = shallow(<App />);
	expect(wrapper.find('div.app').length).toEqual(1);
	expect(wrapper.find('div#header').length).toEqual(1);
	expect(wrapper.find('button#pullTimeline').length).toEqual(1);
	expect(wrapper.find('div#timeline').length).toEqual(1);
    });

    it('should re-render app', () => {
	const wrapper = shallow(<App />);
	wrapper.setState({timeline: "timeline", errorMsg: 'error', isError: true});
	expect(wrapper.find('Timeline').length).toEqual(0);
	expect(wrapper.find('Error').length).toEqual(1);

	wrapper.setState({timeline: "timeline", errorMsg: 'error', isError: false});
	expect(wrapper.find('Timeline').length).toEqual(1);
	expect(wrapper.find('Error').length).toEqual(0);
    });
});
