import { rootReducer } from '../store';

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> =
  ReturnType<PropertiesTypes<T>>;
