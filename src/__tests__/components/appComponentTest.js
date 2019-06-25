import React from 'react';
import {shallow} from 'enzyme';
import App from '../../js/app.js';
import Error from '../../js/components/error.js';

describe('App component', () => {
    App.prototype.updateHomeTimeline = jest.fn();
    App.prototype.updateUserTimeline = jest.fn();

    it('should render app', () => {
	const wrapper = shallow(<App />);
	expect(wrapper.find('div.app').length).toEqual(1);
	expect(wrapper.find('div#timeline').length).toEqual(1);
    });

    it('should re-render app', () => {
	const wrapper = shallow(<App />);
	wrapper.setState({homeTimeline: "timeline", homeTimelineErrorMsg: 'error', userTimeline: "timeline", userTimelineErrorMsg: 'error'});
	expect(wrapper.find('HomeTimeline').length).toEqual(0);
	expect(wrapper.find('UserTimeline').length).toEqual(0);
	expect(wrapper.find('Error').length).toEqual(2);

	wrapper.setState({homeTimeline: "timeline", homeTimelineErrorMsg: null, userTimeline: "timeline", userTimelineErrorMsg: null});
	expect(wrapper.find('HomeTimeline').length).toEqual(1);
	expect(wrapper.find('UserTimeline').length).toEqual(1);
	expect(wrapper.find('Error').length).toEqual(0);
    });
});
