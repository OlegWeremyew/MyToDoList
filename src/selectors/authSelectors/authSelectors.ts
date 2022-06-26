import { AppRootStateType } from '../../App/types';

export const getIsLoggedInSelector = (state: AppRootStateType): boolean =>
  state.auth.isLoggedIn;
