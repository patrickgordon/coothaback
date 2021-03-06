import React from "react";
import { shallow } from "enzyme";

import {
	EffortsList as NotConnectedEffortsList,
	makeMapStateToProps
} from "./EffortsList";

const setup = (propsOverrides = {}) => {
	const fetchEffortsSpy = jest.fn();

	const props = {
		isAuthenticated: false,
		hasEfforts: false,
		efforts: [],
		actions: {
			fetchEfforts: fetchEffortsSpy
		},
		...propsOverrides
	};

	const wrapper = () => shallow(<NotConnectedEffortsList {...props} />);
	const wrapperInstance = () => wrapper().instance();

	const getMappedEffortsFn = jest.fn();
	const getIsAuthenticatedFn = jest.fn();
	const mockSelectors = {
		getMappedEffortsFn,
		getIsAuthenticatedFn
	};

	return {
		wrapper,
		wrapperInstance,
		header: () => wrapper().find("[data-id='noEffortsHeader']"),
		cards: () => wrapper().find("Card"),
		fetchEffortsSpy,
		mapStateToProps: makeMapStateToProps(mockSelectors)
	};
};

describe("renders:", () => {
	it("should render a header if there are no efforts", () => {
		const { header } = setup({ hasEfforts: true });
		expect(header().exists()).toEqual(false);
	});

	it("should not render a header if there are efforts", () => {
		const { header } = setup({ hasEfforts: false });
		expect(header().exists()).toEqual(true);
	});

	it("should render a Card for every effort", () => {
		const mockEfforts = [
			{ id: 123, movingTime: 123 },
			{ id: 456, movingTime: 456 }
		];
		const { cards } = setup({ hasEfforts: true, efforts: mockEfforts });
		expect(cards()).toHaveLength(2);
	});
});

describe("lifecycle:", () => {
	describe("componentDidMount:", () => {
		it("should call fetchEfforts when the component mounts if the user is authenticated", () => {
			const { wrapperInstance, fetchEffortsSpy } = setup({ isAuthenticated: true });
			const instance = wrapperInstance();
			fetchEffortsSpy.mockClear();
			instance.componentDidMount();
			expect(fetchEffortsSpy.mock.calls.length).toEqual(1);
		});

		it("should not call fetchEfforts when the component mounts if the user is not authenticated", () => {
			const { wrapperInstance, fetchEffortsSpy } = setup({ isAuthenticated: false });
			const instance = wrapperInstance();
			fetchEffortsSpy.mockClear();
			instance.componentDidMount();
			expect(fetchEffortsSpy.mock.calls.length).toEqual(0);
		});
	});
});

describe("redux:", () => {
	it("should map hasEfforts to true if there are efforts", () => {
		const { mapStateToProps } = setup();

		const mockState = {
			efforts: { keys: [123] }
		};

		expect(mapStateToProps(mockState).hasEfforts).toEqual(true);
	});

	it("should map hasEfforts to false if there are no efforts", () => {
		const { mapStateToProps } = setup();
		const mockState = {
			efforts: { keys: [] }
		};
		expect(mapStateToProps(mockState).hasEfforts).toEqual(false);
	});
});
