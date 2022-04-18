import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {AppRootStateType} from "../../App/store";
import {AppAction} from "../../App/AppReducer";
import {Nullable} from "../../types/Nullable";

import {AlertProps, Snackbar} from "@material-ui/core";
import MuiAlert from '@material-ui/core/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {

    const dispatch = useDispatch()

    const error = useSelector<AppRootStateType, Nullable<string>>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(AppAction.setAppErrorAC(null))
    }

    const isOpen = error !== null

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
