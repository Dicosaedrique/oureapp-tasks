import CssBaseline from '@mui/material/CssBaseline';
import { NavigationDrawer } from 'app/components/Navigation/Drawer';
import { TopBar } from 'app/components/Navigation/Topbar';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface BasePageProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function BasePage({
    title,
    description,
    children,
}: BasePageProps): React.ReactElement {
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

    return (
        <>
            <Helmet>
                <title>{title}</title>
                {description !== undefined && (
                    <meta name="description" content={description}></meta>
                )}
            </Helmet>
            <div>
                <CssBaseline />
                <TopBar title={title} drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
                <NavigationDrawer open={drawerOpen} handleClose={handleDrawerClose} />
                <main>{children}</main>
            </div>
        </>
    );
}
