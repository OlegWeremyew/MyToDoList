import { authEnumReducer } from '../constants';

export const authAction = {
  setIsLoggedInAC(value: boolean) {
    return {
      type: authEnumReducer.SET_IS_LOGGED_IN,
      payload: { value },
    } as const;
  },
};
