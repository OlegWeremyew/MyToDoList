import * as React from 'react';
import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {RequestStatusType} from "../../App/AppReducer";


export const ButtonAppBar = () => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {
                    status === "loading" &&
                    <>
                        <LinearProgress/>
                        <LinearProgress variant="buffer"/>
                    </>}
            </AppBar>
        </Box>
    );
}