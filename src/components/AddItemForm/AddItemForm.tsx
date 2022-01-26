import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    label: string
}

export const AddItemForm = React.memo(({addItem, label}: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === "Enter") {
            addItemHandler();
        }
    }

    return <div>
        <TextField variant="standard"
                   error={error}
                   size="small"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label={error ? "Title is required" : label}
        />
        <IconButton color="primary" onClick={addItemHandler}>
            <AddBox/>
        </IconButton>
    </div>
})
