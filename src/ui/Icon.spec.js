import React from "react";
import { shallow } from "enzyme";

import Icon from "./Icon";

const setup = (propsOverrides = {}) => {
	const props = {
		...propsOverrides
	}

	const wrapper = () => shallow(<Icon {...props} />)

	return {
		wrapper,
		icon: (classToCheck = 'fal') => wrapper().find('i').hasClass(classToCheck)
	};
}

describe("renders:", () => {
	it("should render an 'i' with the fal class", () => {
		const { icon } = setup();
		expect(icon()).toBe(true)
	});

	it("should apply the fa-spin class when isSpin is true", () => {
		const { icon } = setup({ isSpin: true })
		expect(icon('fa-spin')).toBe(true);
	});

	it("should append the provided icon name and make it a class", () => {
		const { icon } = setup({ iconName: "cog" })
		expect(icon('fa-cog')).toBe(true);
	})
});