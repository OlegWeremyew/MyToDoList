import { ActionAppTypes } from '../../../App/AppReducer';
import { InferActionTypes } from '../../../App/store';
import { authAction, initialAuthState } from '../authReducer';

export type InitialAuthStateType = typeof initialAuthState;

export type AuthReducerActionsType = ActionAuthTypes | ActionAppTypes;

export type ActionAuthTypes = InferActionTypes<typeof authAction>;
