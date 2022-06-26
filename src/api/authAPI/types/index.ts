import { AxiosResponse } from 'axios';

import { ResponseMeType, ResponseType } from '../../types';

export type LoginPostType = AxiosResponse<ResponseType<{ userId: number }>>;

export type MeGetType = ResponseType<{ data: ResponseMeType }>;
