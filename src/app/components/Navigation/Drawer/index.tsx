import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

import { MemoTaskListsDrawerSection } from './TaskListsDrawerSection';

export interface NavigationDrawerProps {
    open: boolean;
    handleClose: () => void;
}

export function NavigationDrawer({ open, handleClose }: NavigationDrawerProps): React.ReactElement {
    const classes = useStyles();

    return (
        <nav className={classes.drawer} aria-label="application navigation drawer">
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleClose} size="large">
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <MemoTaskListsDrawerSection />
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </List>
            </Drawer>
        </nav>
    );
}

export const MemoNavigationDrawer = React.memo(NavigationDrawer);

export const DRAWER_WIDTH = 300;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
        drawerPaper: {
            width: DRAWER_WIDTH,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
    }),
);
