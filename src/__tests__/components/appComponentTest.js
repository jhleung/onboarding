import React from 'react';
import {shallow} from 'enzyme';
import App from '../../js/app.js';


describe('App component', () => {
    App.prototype.updateHomeTimeline = jest.fn();
    App.prototype.updateUserTimeline = jest.fn();

    it('should render app', () => {
	const wrapper = shallow(<App />);
	expect(wrapper.find('div.app').length).toEqual(1);
	expect(wrapper.find('button#pullHomeTimeline').length).toEqual(1);
	expect(wrapper.find('button#pullUserTimeline').length).toEqual(1);
	expect(wrapper.find('div.homeTimeline').length).toEqual(1);
	expect(wrapper.find('div.userTimeline').length).toEqual(1);
	expect(wrapper.find('div.homeTimelineHeader').length).toEqual(1);
	expect(wrapper.find('div.userTimelineHeader').length).toEqual(1);
    });

    it('should re-render app', () => {
	const wrapper = shallow(<App />);
	wrapper.setState({homeTimeline: "timeline", homeTimelineErrorMsg: 'error', userTimeline: "timeline", userTimelineErrorMsg: 'error'});
	expect(wrapper.find('Timeline').length).toEqual(0);
	expect(wrapper.find('Error').length).toEqual(2);

	wrapper.setState({homeTimeline: "timeline", homeTimelineErrorMsg: null, userTimeline: "timeline", userTimelineErrorMsg: null});
	expect(wrapper.find('Timeline').length).toEqual(2);
	expect(wrapper.find('Error').length).toEqual(0);
    });
});
