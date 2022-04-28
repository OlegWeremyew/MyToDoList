import { LoadingStatuses } from '../../features/enums';

import { AppAction } from './AppAction';
import { appReducer } from './AppReducer';
import { InitialAppStateType } from './types';

let startState: InitialAppStateType;
beforeEach(() => {
  startState = {
    error: null,
    status: LoadingStatuses.Idle,
    isInitialized: false,
  };
});

test('correct error message should be set', () => {
  const action = AppAction.setAppErrorAC('Some error');

  const endState = appReducer(startState, action);

  expect(endState.error).toBe('Some error');
});
test('correct status should be set', () => {
  const action = AppAction.setAppStatusAC(LoadingStatuses.Idle);

  const endState = appReducer(startState, action);

  expect(endState.status).toBe('idle');
});
