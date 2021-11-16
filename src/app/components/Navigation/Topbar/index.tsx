import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { DRAWER_WIDTH } from 'app/components/Navigation/Drawer';
import clsx from 'clsx';
import React from 'react';

export interface TopBarProps {
    title: string;
    drawerOpen: boolean;
    handleDrawerOpen: () => void;
}

export function TopBar({ title, drawerOpen, handleDrawerOpen }: TopBarProps): React.ReactElement {
    const classes = useStyles();

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: drawerOpen,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, drawerOpen && classes.hide)}
                    size="large"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    What do I have to do ?
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
    }),
);
