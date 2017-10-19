import sinon from "sinon";

import { 
	BASE_URL,
	CALL_API,
	middleware 
} from "./apiMiddleware";

const setup = () => {
	const dispatchSpy = sinon.spy();
	const nextStub = sinon.stub();

	const mockStore = {
		dispatch: dispatchSpy
	};

	const apiAction = {
		[CALL_API]: {
			types: ["REQUEST", "SUCCESS", "FAILURE"],
			endpoint: "/test",
			method: "GET"
		}
	}

	const result = [{ id: 123 }]
	const successfulResponse = {
		json: () => Promise.resolve(result)
	}
	
	const fetchStub = sinon.stub().returns(Promise.resolve(successfulResponse));
	const normalizeStub = sinon.stub().returns(result)
	
	const middlewareArgs = {
		fetchFn: fetchStub,
		normalizeFn: normalizeStub
	}

	return {
		dispatchSpy,
		mockStore,
		nextStub,
		middlewareArgs,
		fetchStub,
		apiAction,
		result
	}
}

it("should let non API actions fall through", () => {
	const { middlewareArgs, mockStore, nextStub } = setup();

	const nonApiAction = {
		type: "MY_ACTION"
	}

	nextStub.withArgs(nonApiAction).returns("fall through")

	const result = middleware(middlewareArgs)(mockStore)(nextStub)(nonApiAction);
	expect(result).toEqual("fall through");
});

it("should dispatch a request action", () => {
	const { middlewareArgs, mockStore, dispatchSpy, nextStub, apiAction } = setup();
	middleware(middlewareArgs)(mockStore)(nextStub)(apiAction);
	expect(dispatchSpy.firstCall.args).toEqual([{ type: "REQUEST" }])
});

it("should call fetch with the full URL and the configuration method", () => {
	const { middlewareArgs, fetchStub, mockStore, nextStub, apiAction } = setup();
	middleware(middlewareArgs)(mockStore)(nextStub)(apiAction);
	expect(fetchStub.firstCall.args).toEqual([`${BASE_URL}/test`, { method: "GET" }])
});

describe("successful requests:", () => {
	it("should dispatch a success action with the noramlized result", () => {
		const { middlewareArgs, result, mockStore, dispatchSpy, nextStub, apiAction } = setup();
		return middleware(middlewareArgs)(mockStore)(nextStub)(apiAction).then(() => {
			expect(dispatchSpy.secondCall.args).toEqual([{
				type: "SUCCESS",
				payload: result
			}])
		});
		
	})
});