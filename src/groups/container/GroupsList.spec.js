import React from "react";
import { shallow } from "enzyme";

import {
	GroupsList as NotConnectedGroupsList,
	makeMapStateToProps
} from "./GroupsList";

const setup = (propsOverrides = {}) => {
	const fetchGroupsSpy = jest.fn();

	const props = {
		groups: [],
		actions: {
			fetchGroups: fetchGroupsSpy
		},
		...propsOverrides
	};

	const wrapper = () => shallow(<NotConnectedGroupsList {...props} />);
	const wrapperInstance = () => wrapper().instance();

	const getMappedGroupsFn = jest.fn();
	const mockSelectors = {
		getMappedGroupsFn
	};

	return {
		wrapper,
		wrapperInstance,
		fetchGroupsSpy,
		mapStateToProps: makeMapStateToProps(mockSelectors)
	};
};

describe("renders:", () => {
});

describe("lifecycle:", () => {
	describe("componentDidMount:", () => {
		it("should call fetchGroups when the component mounts if the user is authenticated", () => {
			const { wrapperInstance, fetchGroupsSpy } = setup();
			const instance = wrapperInstance();
			fetchGroupsSpy.mockClear();
			instance.componentDidMount();
			expect(fetchGroupsSpy.mock.calls.length).toEqual(1);
		});
	});
});

describe("redux:", () => {
	it("should map hasGroups to true if there are groups", () => {
		const { mapStateToProps } = setup();

		const mockState = {
			groups: { keys: [123] }
		};

		expect(mapStateToProps(mockState).hasGroups).toEqual(true);
	});

	it("should map hasGroups to false if there are no groups", () => {
		const { mapStateToProps } = setup();
		const mockState = {
			groups: { keys: [] }
		};
		expect(mapStateToProps(mockState).hasGroups).toEqual(false);
	});
});
