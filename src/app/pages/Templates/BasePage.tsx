import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DRAWER_WIDTH, NavigationDrawer } from 'app/components/Navigation/Drawer';
import { TopBar } from 'app/components/Navigation/Topbar';
import clsx from 'clsx';
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
    const classes = useStyles();

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
            <div className={classes.root}>
                <CssBaseline />
                <TopBar title={title} drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
                <NavigationDrawer open={drawerOpen} handleClose={handleDrawerClose} />
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: drawerOpen,
                    })}
                >
                    {children}
                </main>
            </div>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -DRAWER_WIDTH,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }),
);
