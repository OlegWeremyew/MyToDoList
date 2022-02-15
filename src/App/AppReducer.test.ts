import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./AppReducer";


let startState: InitialStateType;
beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
    }
});

test('correct error message should be set', () => {
    const action = setErrorAC("Some error");

    const endState = appReducer(startState, action)

    expect(endState.error).toBe("Some error");
});
test('correct status should be set', () => {
    const action = setStatusAC("idle");

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("idle");
});