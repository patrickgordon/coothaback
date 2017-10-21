import React from "react";
import { shallow } from "enzyme";

import TokenExchange from "./TokenExchange";

const setup = (propsOverrides = {}) => {
	const props = {
		...propsOverrides
	};

	const wrapper = () => shallow(<TokenExchange {...props} />);

	return {
		wrapper
	};
};

describe("renders:", () => {

});

describe("lifecycle:", () => {

});
