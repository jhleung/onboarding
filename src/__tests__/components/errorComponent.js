import React from 'react';
import {shallow} from 'enzyme';
import {HomeTimelineError, UserTimelineError} from '../../js/components/error.js';

describe('HomeTimeline Error component', () => {
    it('should render error component', () => {
	const errorMsg = 'error';
	const wrapper = shallow(<HomeTimelineError errorMsg={errorMsg} />);
	expect(wrapper.find('div.homeTimelineError').length).toEqual(1);
	expect(wrapper.find('div.error').text()).toEqual(errorMsg);
    });
});

describe('UserTimeline Error component', () => {
    it('should render error component', () => {
	const errorMsg = 'error';
	const wrapper = shallow(<UserTimelineError errorMsg={errorMsg} />);
	expect(wrapper.find('div.userTimelineError').length).toEqual(1);
	expect(wrapper.find('div.error').text()).toEqual(errorMsg);
    });
});