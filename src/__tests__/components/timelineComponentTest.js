import React from 'react';
import {shallow} from 'enzyme';
import {HomeTimeline, UserTimeline} from '../../js/components/timeline.js';

describe('HomeTimeline component', () => {
    it('should render home timeline component', () => {
	const timeline = JSON.parse('[{\"tweet1\":\"1\"}, {\"tweet2\":\"2\"}, {\"tweet3\":\"3\"}]');
	const wrapper = shallow(<HomeTimeline rawTimeline={timeline}/>);
	expect(wrapper.find('div#timeline-inner').length).toEqual(1);
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
	expect(wrapper.find('Tweet.tweet-style-one').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-two').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one-last-tweet').length).toEqual(1);
    });
});