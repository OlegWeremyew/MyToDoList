import { AppAction, appReducer, InitialStateType } from './AppReducer';

let startState: InitialStateType;
beforeEach(() => {
  startState = {
    error: null,
    status: 'idle',
    isInitialized: false,
  };
});

test('correct error message should be set', () => {
  const action = AppAction.setAppErrorAC('Some error');

  const endState = appReducer(startState, action);

  expect(endState.error).toBe('Some error');
});
test('correct status should be set', () => {
  const action = AppAction.setAppStatusAC('idle');

  const endState = appReducer(startState, action);

  expect(endState.status).toBe('idle');
});
