import React from 'react';
import {shallow} from 'enzyme';
import Timeline from '../../js/components/timeline.js';

describe('Timeline component', () => {
    it('should render timeline component', () => {
	const timeline = '[{\"tweet1\":\"1\"}, {\"tweet2\":\"2\"}, {\"tweet3\":\"3\"}]';
	const wrapper = shallow(<Timeline rawTimeline={timeline}/>);
	expect(wrapper.find('div#timeline-inner').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-two').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one-last-tweet').length).toEqual(1);
    });
});