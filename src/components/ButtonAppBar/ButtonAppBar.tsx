import * as React from 'react';
import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {RequestStatusType} from "../../App/AppReducer";
import {logoutTC} from "../../features/Login/authReducer";


export const ButtonAppBar = () => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    {
                        isLoggedIn
                        && <Button variant="outlined" onClick={logoutHandler} color="inherit">Logout</Button>
                    }
                </Toolbar>
                {
                    status === "loading"
                    && <>
                        <LinearProgress/>
                    </>
                }
            </AppBar>
        </Box>
    );
}