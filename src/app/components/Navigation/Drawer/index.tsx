import useMediaQuery from '@mui/material/useMediaQuery';
import { Breakpoint } from '@mui/system';
import { Theme } from 'app';
import { DrawerContent } from 'app/components/Navigation/Drawer/DrawerContent';
import { ResponsiveDrawer } from 'app/components/Navigation/Drawer/ResponsiveDrawer';
import React from 'react';
import { idle } from 'utils';

export const DRAWER_WIDTH = 350;

interface DrawerProps {
    breakPoint: Breakpoint;
    mobileOpen: boolean;
    handleMobileToggle: () => void;
}

export function Drawer({
    breakPoint,
    mobileOpen,
    handleMobileToggle,
}: DrawerProps): React.ReactElement {
    const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down(breakPoint));

    const finalhandleMobileToggle = isMobile ? handleMobileToggle : idle;

    return (
        <ResponsiveDrawer
            width={DRAWER_WIDTH}
            isMobile={isMobile}
            mobileOpen={mobileOpen}
            handleMobileToggle={finalhandleMobileToggle}
            breakPoint={breakPoint}
        >
            <DrawerContent handleMobileToggle={finalhandleMobileToggle} />
        </ResponsiveDrawer>
    );
}

export const MemoDrawer = React.memo(Drawer);
