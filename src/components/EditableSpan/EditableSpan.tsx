import React, { ChangeEvent, FC, memo, useState } from 'react';

import { TextField } from '@material-ui/core';

import style from './EditableSpan.module.scss';
import { EditableSpanPropsType } from './types';

export const EditableSpan: FC<EditableSpanPropsType> = memo(({ value, onChange }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(value);

  const activateEditMode = (): void => {
    setEditMode(true);
    setTitle(value);
  };
  const activateViewMode = (): void => {
    setEditMode(false);
    onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      variant="standard"
      value={title}
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewMode}
    />
  ) : (
    <span onDoubleClick={activateEditMode} className={style.text}>
      {value}
    </span>
  );
});
