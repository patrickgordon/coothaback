import React from "react";
import { shallow } from "enzyme";

import TokenExchange from "./TokenExchange";

const setup = (propsOverrides = {}) => {
	const authorizeSpy = jest.fn();

	const props = {
		actions: {
			authorize: authorizeSpy
		},
		...propsOverrides
	};

	const wrapper = () => shallow(<TokenExchange {...props} />);
	const wrapperInstance = () => wrapper().instance();

	return {
		wrapper,
		wrapperInstance
	};
};

describe("renders:", () => {

});

describe("lifecycle:", () => {
	describe("componentDidMount:", () => {
		const { wrapperInstance } = setup();
	});
});
