/**
 *
 * defines the general navigation drawer for the whole application
 *
 */

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SettingsIcon from '@material-ui/icons/Settings';
import { MemoTaskListsDrawerSection } from 'app/components/Navigation/Drawer/TaskListsDrawerSection';
import React from 'react';

export interface NavigationDrawerProps {
    open: boolean;
    handleClose: () => void;
}

/**
 * Displays the navigation drawer
 */
export function NavigationDrawer({ open, handleClose }: NavigationDrawerProps) {
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
                    <IconButton onClick={handleClose}>
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
