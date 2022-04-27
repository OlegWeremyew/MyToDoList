import { ActionAppTypes } from '../../../App/AppReducer';
import { InferActionTypes } from '../../../App/store';
import { authAction } from '../loginActions/loginActions';
import { initialAuthState } from '../loginReducer/authReducer';

export type InitialAuthStateType = typeof initialAuthState;

export type AuthReducerActionsType = ActionAuthTypes | ActionAppTypes;

export type ActionAuthTypes = InferActionTypes<typeof authAction>;
