import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';

import { MemoListDrawerSection } from './ListDrawerSection';

interface DrawerContentProps {
    handleMobileToggle: () => void;
}

export function DrawerContent({ handleMobileToggle }: DrawerContentProps): React.ReactElement {
    return (
        <>
            <Toolbar />
            <Divider />
            <MemoListDrawerSection handleMobileToggle={handleMobileToggle} />
            <Divider />
        </>
    );
}
