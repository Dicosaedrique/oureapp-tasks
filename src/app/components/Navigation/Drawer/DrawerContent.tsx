import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';

import { MemoListsDrawerSection } from './ListsDrawerSection';

interface DrawerContentProps {
    handleMobileToggle: () => void;
}

export function DrawerContent({ handleMobileToggle }: DrawerContentProps): React.ReactElement {
    return (
        <>
            <Toolbar />
            <Divider />
            <MemoListsDrawerSection handleMobileToggle={handleMobileToggle} />
            <Divider />
            <List>
                <ListItem button onClick={handleMobileToggle}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </>
    );
}
