import { AppRootStateType } from '../../App/store';

export const getIsLoggedInSelector = (state: AppRootStateType): boolean =>
  state.auth.isLoggedIn;
