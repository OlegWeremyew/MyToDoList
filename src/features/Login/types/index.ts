import { ActionAppTypes } from 'App/AppReducer/types';
import { InferActionTypes } from 'App/types';
import { authAction } from 'features/Login';
import { initialAuthState } from 'features/Login/loginReducer/authReducer';

export type InitialAuthStateType = typeof initialAuthState;

export type AuthReducerActionsType = ActionAuthTypes | ActionAppTypes;

export type ActionAuthTypes = InferActionTypes<typeof authAction>;
