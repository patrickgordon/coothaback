import { 
	BASE_URL,
	CALL_API,
	middleware 
} from "./apiMiddleware";

const setup = () => {
	const dispatchSpy = jest.fn();
	const nextStub = jest.fn();

	const mockStore = {
		dispatch: dispatchSpy
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

it("should call fetch with the full URL and the configuration method", () => {
	const { middlewareArgs, fetchStub, mockStore, nextStub, apiAction } = setup();
	middleware(middlewareArgs)(mockStore)(nextStub)(apiAction);
	expect(fetchStub).toBeCalledWith(`${BASE_URL}/test`, { method: "GET" });
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