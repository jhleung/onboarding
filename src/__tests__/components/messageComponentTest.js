import React from 'react';
import {shallow} from 'enzyme';
import Message from '../../js/components/message.js';

describe('Message component', () => {
	it('should render message component', () => {
		const created = 1560896112; 
		const wrapper = shallow(<Message tweet={{"id":"1149365572771225601","message":"msg","user":{"handle":"afraidofbandai1","name":"afraidofbandaids","profileImageUrl":"https://pbs.twimg.com/profile_images/1136302686649741312/VIZBDmOe_normal.png"},"createdAt":1562865081000}}/>);
		expect(wrapper.find('div.message').length).toEqual(1);
		expect(wrapper.find('a.message-link').text()).toEqual("msg");
		expect(wrapper.find('a.message-link').prop('href')).toEqual("https://twitter.com/afraidofbandai1/status/1149365572771225601");
	});
});
