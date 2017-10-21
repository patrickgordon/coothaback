import React from "react";
import { shallow } from "enzyme";

import { TokenExchange as NotConnectedTokenExchange, makeMapStateToProps } from "./TokenExchange";

const setup = (propsOverrides = {}) => {
	const authorizeSpy = jest.fn();
	const pushSpy = jest.fn();

	const props = {
		queryParams: {
			code: "myCode"
		},
		isAuthenticated: false,
		history: {
			push: pushSpy
		},
		actions: {
			authorize: authorizeSpy
		},
		...propsOverrides
	};

	const makeGetQueryParamsFn = () => jest.fn().mockReturnValue("QueryParamsFam");

	const wrapper = () => shallow(<NotConnectedTokenExchange {...props} />);
	const wrapperInstance = () => wrapper().instance();

	return {
		wrapper,
		wrapperInstance,
		authorizeSpy,
		pushSpy,
		mapStateToProps: makeMapStateToProps(makeGetQueryParamsFn)
	};
};

describe("lifecycle:", () => {
	describe("componentDidMount:", () => {
		it("should call authorize with the query param", () => {
			const { wrapperInstance, authorizeSpy } = setup({ queryParams: { code: "fakeNews" } });
			const instance = wrapperInstance();
			authorizeSpy.mockClear();
			instance.componentDidMount();
			expect(authorizeSpy).toBeCalledWith("fakeNews");
		});

		it("should call push if the user is already authenticated", () => {
			const { wrapperInstance, pushSpy } = setup({ isAuthenticated: true });
			const instance = wrapperInstance();
			pushSpy.mockClear();
			instance.componentDidMount();
			expect(pushSpy).toBeCalledWith("/");
		});
	});

	describe("componentWillReceiveProps:", () => {
		it("should call push if the nextProps has isAuthenticated as true", () => {
			const { wrapperInstance, pushSpy } = setup({ isAuthenticated: false });
			const instance = wrapperInstance();
			pushSpy.mockClear();
			instance.componentWillReceiveProps({ isAuthenticated: true });
			expect(pushSpy).toBeCalledWith("/");
		});
	});
});

describe("redux:", () => {
	it("should map queryParams to the output of getQueryParams selector", () => {
		const { mapStateToProps } = setup();

		expect(mapStateToProps({})).toHaveProperty("queryParams", "QueryParamsFam");
	});
});