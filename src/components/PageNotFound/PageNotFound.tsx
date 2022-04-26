import React from 'react';

import { ReturnComponentType } from '../../types/ReturnComponentType';

import style from './PageNotFound.module.scss';

export const PageNotFound = (): ReturnComponentType => (
  <h1 className={style.pageNotFound}>404. Page not found</h1>
);
