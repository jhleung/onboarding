import React from 'react';
import {shallow} from 'enzyme';
import Profile from '../../js/components/profile.js';

describe('Profile component', () => {
	it('should render profile component with handle', () => {
		const url = 'bar';
		const user = 'user';
		const handle = 'handle';
		const wrapper = shallow(<Profile profileImageUrl={url} userName={user} handle={handle} displayHandle={true}/>);
		wrapper.setProps({ profileImageUrl: url, userName: user, handle: handle });
		expect(wrapper.find('div.profile').length).toEqual(1);
		expect(wrapper.find('div.name').text()).toEqual(user);
		expect(wrapper.find('div.handle').text()).toEqual(handle);
		expect(wrapper.find('img.profile-image').prop('src')).toEqual(url);
	});

	it('should render profile component without handle', () => {
		const url = 'bar';
		const user = 'user';
		const handle = 'handle';
		const wrapper = shallow(<Profile profileImageUrl={url} userName={user} handle={handle} displayHandle={false}/>);
		wrapper.setProps({ profileImageUrl: url, userName: user, handle: handle });
		expect(wrapper.find('div.profile').length).toEqual(1);
		expect(wrapper.find('div.name').text()).toEqual(user);
		expect(wrapper.find('div.handle').length).toEqual(0);
		expect(wrapper.find('img.profile-image').prop('src')).toEqual(url);
	});
});
