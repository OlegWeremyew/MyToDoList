import { Dispatch } from 'redux';

import { authAPI } from '../../../api/authAPI/authAPI';
import { ResultCodes } from '../../../enums';
import { authAction } from '../../../features';
import { AppAction } from '../AppAction';

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then(res => {
      if (res.data.resultCode === ResultCodes.Success) {
        dispatch(authAction.setIsLoggedInAC(true));
      }
    })
    .finally(() => {
      dispatch(AppAction.setInitializedAC(true));
    });
};
