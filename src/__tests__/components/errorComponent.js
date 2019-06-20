import React from 'react';
import {shallow} from 'enzyme';
import Error from '../../js/components/error.js';

describe('Error component', () => {
    it('should render error component', () => {
	const errorMsg = 'error';
	const wrapper = shallow(<Error errorMsg={errorMsg} />);
	expect(wrapper.find('div.error').text()).toEqual(errorMsg);
    });
});