import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Breakpoint } from '@mui/system';
import React from 'react';

export interface TopBarProps {
    title: string;
    drawerBreakpoint: Breakpoint;
    handleDrawerToggle: () => void;
}

export function TopBar({
    title,
    drawerBreakpoint,
    handleDrawerToggle,
}: TopBarProps): React.ReactElement {
    return (
        <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { [drawerBreakpoint]: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
