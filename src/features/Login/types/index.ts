import { ActionAppTypes } from '../../../App/AppReducer/types';
import { InferActionTypes } from '../../../App/store';
import { authAction } from '../loginActions';
import { initialAuthState } from '../loginReducer/authReducer';

export type InitialAuthStateType = typeof initialAuthState;

export type AuthReducerActionsType = ActionAuthTypes | ActionAppTypes;

export type ActionAuthTypes = InferActionTypes<typeof authAction>;
