import {
	BASE_URL,
	CALL_API,
	middleware
} from "./apiMiddleware";

const setup = () => {
	const mockState = {
		authentication: {
			accessToken: null
		}
	};

	const dispatchSpy = jest.fn();
	const nextStub = jest.fn();
	const getStateSpy = jest.fn().mockReturnValue(mockState);

	const mockStore = {
		dispatch: dispatchSpy,
		getState: getStateSpy
	};

	const apiAction = {
		[CALL_API]: {
			types: ["REQUEST", "SUCCESS", "FAILURE"],
			endpoint: "/test",
			method: "GET"
		}
	};

	const result = [{ id: 123 }];
	const successfulResponse = {
		ok: true,
		json: () => Promise.resolve(result)
	};

	const fetchStub = jest.fn().mockReturnValue(Promise.resolve(successfulResponse));
	const normalizeStub = jest.fn().mockReturnValue(result);

	const middlewareArgs = {
		fetchFn: fetchStub,
		normalizeFn: normalizeStub
	};

	return {
		dispatchSpy,
		mockStore,
		nextStub,
		middlewareArgs,
		fetchStub,
		apiAction,
		result
	};
};

it("should let non API actions fall through", () => {
	const { middlewareArgs, mockStore, nextStub } = setup();

	const nonApiAction = {
		type: "MY_ACTION"
	};

	nextStub.mockReturnValue("fall through");

	const result = middleware(middlewareArgs)(mockStore)(nextStub)(nonApiAction);
	expect(result).toEqual("fall through");
});

it("should dispatch a request action", () => {
	const { middlewareArgs, mockStore, dispatchSpy, nextStub, apiAction } = setup();
	middleware(middlewareArgs)(mockStore)(nextStub)(apiAction);
	expect(dispatchSpy).toBeCalledWith({ type: "REQUEST" });
});

it("should call fetch with the full URL and the configuration object", () => {
	const { middlewareArgs, fetchStub, mockStore, nextStub, apiAction } = setup();
	middleware(middlewareArgs)(mockStore)(nextStub)(apiAction);
	expect(fetchStub).toBeCalledWith(`${BASE_URL}/test`, {
		method: "GET",
		mode: "cors",
		headers: new Headers({ "Content-Type": "application/json" }),
		body: null
	});
});

it("should decamelize and stringify the body if provided", () => {
	const { middlewareArgs, fetchStub, mockStore, nextStub } = setup();
	const postAPIAction = {
		[CALL_API]: {
			types: ["REQUEST", "SUCCESS", "FAILURE"],
			endpoint: "/test",
			method: "POST",
			body: {
				myKey: "myValue"
			}
		}
	};

	middleware(middlewareArgs)(mockStore)(nextStub)(postAPIAction);
	expect(fetchStub).toBeCalledWith(`${BASE_URL}/test`, {
		method: "POST",
		mode: "cors",
		headers: new Headers({ "Content-Type": "application/json" }),
		body: "{\"my_key\":\"myValue\"}"
	});
});

describe("successful requests:", () => {
	it("should dispatch a success action with the noramlized result", () => {
		const { middlewareArgs, result, mockStore, dispatchSpy, nextStub, apiAction } = setup();
		return middleware(middlewareArgs)(mockStore)(nextStub)(apiAction).then(() => {
			expect(dispatchSpy).toBeCalledWith({
				type: "SUCCESS",
				payload: result
			});
		});

	});
});