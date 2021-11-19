import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import { MemoTaskListsDrawerSection } from './TaskListsDrawerSection';

export interface NavigationDrawerProps {
    open: boolean;
    handleClose: () => void;
}

export function NavigationDrawer({ open, handleClose }: NavigationDrawerProps): React.ReactElement {
    return (
        <nav aria-label="application navigation drawer">
            <Drawer variant="persistent" anchor="left" open={open}>
                <div>
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
