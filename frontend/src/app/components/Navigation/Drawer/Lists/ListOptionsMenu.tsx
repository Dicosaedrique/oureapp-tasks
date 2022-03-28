import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import React from 'react';

interface ListOptionsMenuProps {
    anchorEl: Element | null;
    handleClose: () => void;
    handleOpenEditMenu: () => void;
    handleDeleteList?: () => void;
    handleArchiveList?: () => void;
    archive?: boolean;
}

export function ListOptionsMenu({
    anchorEl,
    handleClose,
    handleOpenEditMenu,
    handleDeleteList,
    handleArchiveList,
    archive = false,
}: ListOptionsMenuProps): React.ReactElement | null {
    const open = Boolean(anchorEl);

    if (!open) return null;

    return (
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            {!archive && (
                <MenuItem onClick={handleOpenEditMenu} style={{ color: '#4e58ee' }}>
                    <EditIcon />
                    &nbsp;&nbsp;Edit List
                </MenuItem>
            )}
            {handleArchiveList && (
                <MenuItem onClick={handleArchiveList} style={{ color: 'orange' }}>
                    {archive ? <UnarchiveIcon /> : <ArchiveIcon />}
                    &nbsp;&nbsp;{archive ? 'Unarchive list' : 'Archive list'}
                </MenuItem>
            )}
            {handleDeleteList && (
                <MenuItem onClick={handleDeleteList} style={{ color: 'red' }}>
                    <DeleteIcon />
                    &nbsp;&nbsp;Delete list
                </MenuItem>
            )}
        </Menu>
    );
}
