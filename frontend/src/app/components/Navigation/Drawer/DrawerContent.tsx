import ArchiveIcon from '@mui/icons-material/Archive';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useArchive } from 'app/components/Archive/context';
import { TasksPagePathParams } from 'app/pages/TasksPage';
import React from 'react';
import { useNavigate, useParams } from 'react-router';

import { MemoListDrawerSection } from './Lists/ListDrawerSection';

interface DrawerContentProps {
    handleMobileToggle: () => void;
}

export function DrawerContent({ handleMobileToggle }: DrawerContentProps): React.ReactElement {
    const params = useParams() as TasksPagePathParams;
    const archive = useArchive();

    const navigate = useNavigate();
    const navigateToArchive = () => {
        navigate(`/list/${archive ? '' : 'archive/'}${params.id}`);
        handleMobileToggle(); // close drawer on navigate (on mobile)
    };

    return (
        <>
            <Toolbar />
            <Divider />
            <MemoListDrawerSection handleMobileToggle={handleMobileToggle} />
            <Divider />
            <List>
                <ListItem button onClick={navigateToArchive}>
                    <ListItemIcon>{archive ? <HomeIcon /> : <ArchiveIcon />}</ListItemIcon>
                    <ListItemText primary={archive ? 'Leave the archive' : 'Go to the archive'} />
                </ListItem>
            </List>
        </>
    );
}
