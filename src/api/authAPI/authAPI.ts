import { instance } from '../apiConfig';
import { LoginParamsType, ResponseType } from '../types';

import { LoginPostType, MeGetType } from './types';

export const authAPI = {
  login(data: LoginParamsType) {
    const endPoint = '/auth/login';
    return instance.post<LoginParamsType, LoginPostType>(endPoint, data);
  },
  me() {
    const endPoint = '/auth/me';
    return instance.get<MeGetType>(endPoint);
  },
  logout() {
    const endPoint = '/auth/login';
    return instance.delete<ResponseType>(endPoint);
  },
};
