import React, {useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    rename: (title: string) => void
}

export const EditableSpan = ({title, rename}: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(true)
    const [newTitle, setNewTitle] = useState('')

    const activeViewMode = () => {
        setEdit(true)
        rename(newTitle)
    }
    const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

    }
    const onClickSpan = () => {
        setEdit(false)
        setNewTitle(title)
    }
    const onKeyPress= (e: React.KeyboardEvent<HTMLDivElement>)=> {
        if (e.key === 'Enter') {
            activeViewMode();
        }
    }
    return (
        edit
            ? <p style={{whiteSpace:'pre-wrap', maxWidth: '200px' }} onDoubleClick={onClickSpan}>{title}</p>
            : <TextField id="outlined-basic"
                         variant="outlined"
                         value={newTitle}
                         size="small"
                         onChange={onChangeNameHandler}
                         onBlur={activeViewMode}
                         autoFocus
                         onKeyPress={onKeyPress}
                         sx={{ width: '170px' }}

            />

    )
}