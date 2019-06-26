import React from 'react';
import {shallow} from 'enzyme';
import {HomeTimeline, UserTimeline} from '../../js/components/timeline.js';

describe('HomeTimeline component', () => {
    HomeTimeline.prototype.pullTimeline = jest.fn();
    UserTimeline.prototype.pullTimeline = jest.fn();

    it('should render home timeline component', () => {
	const wrapper = shallow(<HomeTimeline/>);
	wrapper.setState({timeline: [{"tweet1":"1"}, {"tweet2":"2"}, {"tweet3":"3"}], errorMsg: null});
	expect(wrapper.find('div#timeline-inner').length).toEqual(1);
	expect(wrapper.find('div.homeTimeline').length).toEqual(1);
	expect(wrapper.find('div.homeTimelineHeader').length).toEqual(1);
	expect(wrapper.find('div#pullHomeTimeline').length).toEqual(1);
	expect(wrapper.find('button').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-two').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one-last-tweet').length).toEqual(1);
    });

    it('should re-render timeline', () => {
	const wrapper = shallow(<HomeTimeline />);
	wrapper.setState({timeline: [{"tweet1":"1"}, {"tweet2":"2"}, {"tweet3":"3"}], errorMsg: 'error'});
	expect(wrapper.find('Error').length).toEqual(1);

	wrapper.setState({timeline: [{"tweet1":"1"}, {"tweet2":"2"}, {"tweet3":"3"}], errorMsg: null, userTimeline: "timeline", userTimelineErrorMsg: null});
	expect(wrapper.find('Error').length).toEqual(0);
	expect(wrapper.find('div#timeline-inner').length).toEqual(1);
    });
});

describe('UserTimeline component', () => {
    it('should render user timeline component', () => {
	const wrapper = shallow(<UserTimeline/>);
	wrapper.setState({timeline: [{"tweet1":"1"}, {"tweet2":"2"}, {"tweet3":"3"}], errorMsg: null});
	expect(wrapper.find('div#timeline-inner').length).toEqual(1);
	expect(wrapper.find('div.userTimeline').length).toEqual(1);
	expect(wrapper.find('div.userTimelineHeader').length).toEqual(1);
	expect(wrapper.find('div#pullUserTimeline').length).toEqual(1);
	expect(wrapper.find('button').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-two').length).toEqual(1);
	expect(wrapper.find('Tweet.tweet-style-one-last-tweet').length).toEqual(1);
    });

     it('should re-render timeline', () => {
	const wrapper = shallow(<UserTimeline />);
	wrapper.setState({timeline: [{"tweet1":"1"}, {"tweet2":"2"}, {"tweet3":"3"}], errorMsg: 'error'});
	expect(wrapper.find('Error').length).toEqual(1);

	wrapper.setState({timeline: [{"tweet1":"1"}, {"tweet2":"2"}, {"tweet3":"3"}], errorMsg: null});
	expect(wrapper.find('Error').length).toEqual(0);
	expect(wrapper.find('div#timeline-inner').length).toEqual(1);
    });
});
