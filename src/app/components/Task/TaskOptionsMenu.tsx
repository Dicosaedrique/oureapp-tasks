import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

interface TaskOptionsMenuProps {
    anchorEl: Element | null;
    onEditTask: () => void;
    onArchiveTask: () => void;
    onDeleteTask: () => void;
    onCloseMenu: () => void;
    archive?: boolean;
}

export function TaskOptionsMenu({
    anchorEl,
    onEditTask,
    onArchiveTask,
    onDeleteTask,
    onCloseMenu,
    archive = false,
}: TaskOptionsMenuProps): React.ReactElement {
    const open = Boolean(anchorEl);

    return (
        <Menu
            id="task-options-menu"
            aria-haspopup="true"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={onCloseMenu}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            {!archive && (
                <MenuItem onClick={onEditTask} style={{ color: '#4e58ee' }}>
                    <EditIcon />
                    &nbsp;&nbsp;Edit task
                </MenuItem>
            )}
            <MenuItem onClick={onArchiveTask} style={{ color: 'orange' }}>
                {archive ? <ArchiveIcon /> : <UnarchiveIcon />}
                &nbsp;&nbsp;{archive ? 'Unarchive task' : 'Archive task'}
            </MenuItem>
            <MenuItem onClick={onDeleteTask} style={{ color: 'red' }}>
                <DeleteIcon />
                &nbsp;&nbsp;Delete task
            </MenuItem>
        </Menu>
    );
}
