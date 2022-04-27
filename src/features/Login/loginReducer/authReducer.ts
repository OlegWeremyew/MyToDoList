import { authEnumReducer } from '../constants';
import { AuthReducerActionsType, InitialAuthStateType } from '../types';

export const initialAuthState = {
  isLoggedIn: false,
};

export const authReducer = (
  state: InitialAuthStateType = initialAuthState,
  action: AuthReducerActionsType,
): InitialAuthStateType => {
  switch (action.type) {
    case authEnumReducer.SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload.value };
    default:
      return state;
  }
};
