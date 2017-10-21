import { getSearch, makeGetQueryParams } from "./utilitySelectors";

const setup = () => {
	const parseQueryStringSpy = jest.fn();

	return {
		parseQueryStringSpy,
		getQueryParams:  makeGetQueryParams(parseQueryStringSpy)
	};
};

describe("getSearch:", () => {
	it("should strip the ? from the query params", () => {
		const mockProps = {
			location: {
				search: "?code=myCode"
			}
		};

		expect(getSearch(undefined, mockProps)).toEqual("code=myCode");
	});

	it("should return an empty string if there is no search", () => {
		expect(getSearch(undefined, {})).toEqual("");
	});
});

describe("getQueryParams:", () => {
	it("should return the output of parseQueryStringFn", () => {
		const { parseQueryStringSpy, getQueryParams } = setup();
		parseQueryStringSpy.mockReturnValue({ code: "myCode" });
		expect(getQueryParams.resultFunc("code=myCode")).toEqual({ code: "myCode" });
	});
});