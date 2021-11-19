import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

export interface TopBarProps {
    title: string;
    drawerOpen: boolean;
    handleDrawerOpen: () => void;
}

export function TopBar({ title, drawerOpen, handleDrawerOpen }: TopBarProps): React.ReactElement {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
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
