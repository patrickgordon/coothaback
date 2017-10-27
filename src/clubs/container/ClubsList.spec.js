import React from "react";
import { shallow } from "enzyme";

import {
	ClubsList as NotConnectedClubsList,
	makeMapStateToProps
} from "./ClubsList";

const setup = (propsOverrides = {}) => {
	const fetchClubsSpy = jest.fn();

	const props = {
		clubs: [],
		actions: {
			fetchClubs: fetchClubsSpy
		},
		...propsOverrides
	};

	const wrapper = () => shallow(<NotConnectedClubsList {...props} />);
	const wrapperInstance = () => wrapper().instance();

	const getMappedClubsFn = jest.fn();
	const mockSelectors = {
		getMappedClubsFn
	};

	return {
		wrapper,
		wrapperInstance,
		fetchClubsSpy,
		mapStateToProps: makeMapStateToProps(mockSelectors)
	};
};

describe("renders:", () => {
});

describe("lifecycle:", () => {
	describe("componentDidMount:", () => {
		it("should call fetchClubs when the component mounts if the user is authenticated", () => {
			const { wrapperInstance, fetchClubsSpy } = setup();
			const instance = wrapperInstance();
			fetchClubsSpy.mockClear();
			instance.componentDidMount();
			expect(fetchClubsSpy.mock.calls.length).toEqual(1);
		});
	});
});

describe("redux:", () => {
	it("should map hasClubs to true if there are clubs", () => {
		const { mapStateToProps } = setup();

		const mockState = {
			clbus: { keys: [123] }
		};

		expect(mapStateToProps(mockState).hasClubs).toEqual(true);
	});

	it("should map hasClubs to false if there are no clubs", () => {
		const { mapStateToProps } = setup();
		const mockState = {
			clubs: { keys: [] }
		};
		expect(mapStateToProps(mockState).hasClubs).toEqual(false);
	});
});
