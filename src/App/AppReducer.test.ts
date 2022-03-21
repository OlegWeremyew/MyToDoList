import {appReducer, setAppErrorAC, setAppStatusAC} from "./AppReducer";


let startState: any;
beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
    }
});

test('correct error message should be set', () => {
    const action = setAppErrorAC({error: "Some error"});

    const endState = appReducer(startState, action)

    expect(endState.error).toBe("Some error");
});
test('correct status should be set', () => {
    const action = setAppStatusAC({status:"idle"});

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("idle");
});