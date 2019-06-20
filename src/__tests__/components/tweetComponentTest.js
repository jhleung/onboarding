import React from 'react';
import {shallow} from 'enzyme';
import Tweet from '../../js/components/tweet.js';

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