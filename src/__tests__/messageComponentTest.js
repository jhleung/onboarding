import React from 'react';
import {shallow} from 'enzyme';
import Message from '../js/components/message.js';

describe('Message component', () => {
    it('should render message component', () => {
	const created = 1560896112; 
	const msg = 'message';
	const id = '1';
	const handle = 'handle';
	const url = `https://twitter.com/${handle}/status/${id}`
	const wrapper = shallow(<Message createdAt={created} message={msg} handle={handle} id={id}/>);
	expect(wrapper.find('div.message').length).toEqual(1);
	expect(wrapper.find('a.message-link').text()).toEqual(msg);
	expect(wrapper.find('a.message-link').prop('href')).toEqual(url);
    });
});