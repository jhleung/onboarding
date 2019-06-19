import React from 'react';
import {shallow} from 'enzyme';
import Tweet from '../js/components/tweet.js';
import Timeline from '../js/components/timeline.js';
import Profile from '../js/components/profile.js';
import Message from '../js/components/message.js';
import Error from '../js/components/error.js';
import App from '../js/app.js';

describe('Profile component', () => {
    it('should render profile component', () => {
	const url = 'bar';
	const user = 'user';
	const handle = 'handle';
	const wrapper = shallow(<Profile profileImageUrl={url} userName={user} handle={handle}/>);
	wrapper.setProps({ profileImageUrl: url, userName: user, handle: handle });
	expect(wrapper.find('div.profile').length).toEqual(1);
	expect(wrapper.find('div.name').text()).toEqual(user);
	expect(wrapper.find('div.handle').text()).toEqual(handle);
	expect(wrapper.find('img.profile-image').prop('src')).toEqual(url);
    });
});

describe('Message component', () => {
    it('should render message component', () => {
	const created = 1560896112; 
	const msg = 'message';
	const id = '1';
	const handle = 'handle';
	const url = `https://twitter.com/${handle}/status/${id}`
	const wrapper = shallow(<Message createdAt={created} message={msg} handle={handle} id={id}/>);
	expect(wrapper.find('div.message').length).toEqual(1);
	//expect(wrapper.find('div.timestamp').text()).toEqual('Jun 18');
	expect(wrapper.find('a.message-link').text()).toEqual(msg);
	expect(wrapper.find('a.message-link').prop('href')).toEqual(url);
    });
});

describe('Error component', () => {
    it('should render error component', () => {
	const errorMsg = 'error';
	const wrapper = shallow(<Error errorMsg={errorMsg} />);
	expect(wrapper.find('div.error').text()).toEqual(errorMsg);
    });
});

describe('Tweet component', () => {
    it('should render tweet component', () => {
	let tweet = jest.fn();
	tweet.user = jest.fn();
	const wrapper = shallow(<Tweet className='tweet' tweet={tweet}/>);
	expect(wrapper.find('div.tweet').length).toEqual(1);
	expect(wrapper.find('Profile').length).toEqual(1);
	expect(wrapper.find('Message').length).toEqual(1);
    });
});

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
