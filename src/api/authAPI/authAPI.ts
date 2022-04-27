import { AxiosResponse } from 'axios';

import { instance } from '../apiConfig';
import { LoginParamsType, ResponseMeType, ResponseType } from '../types';

export const authAPI = {
  login(data: LoginParamsType) {
    const endPoint = '/auth/login';
    return instance.post<
      LoginParamsType,
      AxiosResponse<ResponseType<{ userId: number }>>
    >(endPoint, data);
  },
  me() {
    const endPoint = '/auth/me';
    return instance.get<ResponseType<{ data: ResponseMeType }>>(endPoint);
  },
  logout() {
    const endPoint = '/auth/login';
    return instance.delete<ResponseType>(endPoint);
  },
};
