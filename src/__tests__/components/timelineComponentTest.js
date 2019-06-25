import React from 'react';
import {shallow} from 'enzyme';
import {HomeTimeline, UserTimeline} from '../../js/components/timeline.js';

describe('HomeTimeline component', () => {
    it('should render home timeline component', () => {
	const timeline = JSON.parse('[{\"tweet1\":\"1\"}, {\"tweet2\":\"2\"}, {\"tweet3\":\"3\"}]');
	const wrapper = shallow(<HomeTimeline rawTimeline={timeline}/>);
	expect(wrapper.find('div#timeline-inner').length).toEqual(1);
	expect(wrapper.find('div.homeTimeline').length).toEqual(1);
	expect(wrapper.find('div.homeTimelineHeader').length).toEqual(1);
	expect(wrapper.find('button#pullHomeTimeline').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-two').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one-last-tweet').length).toEqual(1);
    });
});

describe('UserTimeline component', () => {
    it('should render user timeline component', () => {
	const timeline = JSON.parse('[{\"tweet1\":\"1\"}, {\"tweet2\":\"2\"}, {\"tweet3\":\"3\"}]');
	const wrapper = shallow(<UserTimeline rawTimeline={timeline}/>);
	expect(wrapper.find('div#timeline-inner').length).toEqual(1);
	expect(wrapper.find('div.userTimeline').length).toEqual(1);
	expect(wrapper.find('div.userTimelineHeader').length).toEqual(1);
	expect(wrapper.find('button#pullUserTimeline').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-two').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one-last-tweet').length).toEqual(1);
    });
});