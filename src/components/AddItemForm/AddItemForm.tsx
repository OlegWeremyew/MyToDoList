import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';

import { EMPTY_STRING } from '../../constants';

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(
  ({ addItem, label, disabled = false }) => {
    const [title, setTitle] = useState<string>(EMPTY_STRING);
    const [error, setError] = useState<boolean>(false);

    const addItemHandler = (): void => {
      if (title.trim() !== EMPTY_STRING) {
        addItem(title);
        setTitle(EMPTY_STRING);
      } else {
        setError(true);
      }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
      setError(false);
      if (e.key === 'Enter') {
        addItemHandler();
      }
    };

    return (
      <div>
        <TextField
          disabled={disabled}
          variant="standard"
          error={error}
          size="small"
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          label={error ? 'Title is required' : label}
        />
        <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
          <AddBox />
        </IconButton>
      </div>
    );
  },
);

// type

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  label: string;
  disabled?: boolean;
};
