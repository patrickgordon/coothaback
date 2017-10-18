import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";

import { 
	EffortsList as NotConnectedEffortsList,
	mapStateToProps
} from "./EffortsList";

const setup = (propsOverrides = {}) => {
	const fetchEffortsSpy = sinon.spy();

	const props = {
		hasEfforts: false,
		efforts: [],
		actions: {
			fetchEfforts: fetchEffortsSpy
		},
		...propsOverrides
	}
	const wrapper = () => shallow(<NotConnectedEffortsList {...props} />)

	return {
		wrapper,
		header: () => wrapper().find("[data-id='noEffortsHeader']"),
		cards: () => wrapper().find("Card"),
		fetchEffortsSpy
	};
}

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
		]
		const { cards } = setup({ hasEfforts: true, efforts: mockEfforts })
		expect(cards()).toHaveLength(2);
	});
});

describe("redux:", () => {
	it("should map hasEfforts to true if there are efforts", () => {
		const mockState = {
			efforts: { results: [{ id: 123 }] }
		}

		expect(mapStateToProps(mockState).hasEfforts).toEqual(true);
	});

	it("should map hasEfforts to false if there are no efforts", () => {
		const mockState = {
			efforts: { results: [] }
		}

		expect(mapStateToProps(mockState).hasEfforts).toEqual(false);
	});
})
