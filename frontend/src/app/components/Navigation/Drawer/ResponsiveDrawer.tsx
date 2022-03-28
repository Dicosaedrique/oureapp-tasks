import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Breakpoint } from '@mui/system';

interface ResponsiveDrawerProps {
    width: number;
    breakPoint: Breakpoint;
    mobileOpen: boolean;
    handleMobileToggle: () => void;
    isMobile: boolean;
    children: React.ReactElement;
}

export function ResponsiveDrawer({
    width,
    isMobile,
    breakPoint,
    mobileOpen,
    handleMobileToggle,
    children,
}: ResponsiveDrawerProps): React.ReactElement {
    return (
        <Box
            component="nav"
            sx={{ width: { [breakPoint]: width }, flexShrink: { [breakPoint]: 0 } }}
            aria-label="application navigation drawer"
        >
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleMobileToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width },
                    }}
                >
                    {children}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width },
                    }}
                    open
                >
                    {children}
                </Drawer>
            )}
        </Box>
    );
}
