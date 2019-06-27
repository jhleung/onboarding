import React from 'react';
import {shallow} from 'enzyme';
import App from '../../js/app.js';
import Error from '../../js/components/error.js';

describe('App component', () => {
	it('should render app', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('div.app').length).toEqual(1);
		expect(wrapper.find('div#timeline').length).toEqual(1);
		expect(wrapper.find('HomeTimeline').length).toEqual(1);
		expect(wrapper.find('UserTimeline').length).toEqual(1);
	});
});
