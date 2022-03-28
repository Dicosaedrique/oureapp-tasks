import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Breakpoint } from '@mui/system';
import { ARCHIVE_COLOR, useArchive } from 'app/components/Archive/context';
import { Drawer, DRAWER_WIDTH } from 'app/components/Navigation/Drawer';
import { TopBar } from 'app/components/Navigation/Topbar';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface BasePageProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

const drawerBreakpoint: Breakpoint = 'md';

export default function BasePage({
    title,
    description,
    children,
}: BasePageProps): React.ReactElement {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const handleDrawerToggle = () => setDrawerOpen(state => !state);
    const archive = useArchive();

    return (
        <>
            <Helmet>
                <title>{title}</title>
                {description && <meta name="description" content={description}></meta>}
            </Helmet>
            <Box sx={{ display: 'flex' }}>
                <TopBar
                    title={title}
                    drawerBreakpoint={drawerBreakpoint}
                    handleDrawerToggle={handleDrawerToggle}
                    color={archive ? ARCHIVE_COLOR : undefined}
                />
                <Drawer
                    breakPoint={drawerBreakpoint}
                    mobileOpen={drawerOpen}
                    handleMobileToggle={handleDrawerToggle}
                />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { [drawerBreakpoint]: `calc(100% - ${DRAWER_WIDTH}px)` },
                    }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </>
    );
}
