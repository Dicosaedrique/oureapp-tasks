import ListIcon from '@mui/icons-material/List';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MuiListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import { TaskListStats } from 'model/TaskList';
import React from 'react';

interface ListItemProps {
    list: TaskListStats;
    archive: boolean;
    selected: boolean;
    onNavigate: () => void;
    onOptions: (event: React.MouseEvent<HTMLElement>) => void;
    enableOptions?: boolean;
}

export function ListItem({
    list,
    archive,
    selected,
    onNavigate,
    onOptions,
    enableOptions = true,
}: ListItemProps): React.ReactElement {
    const taskCount = archive ? list.archiveTaskCount : list.taskToDoCount;

    return (
        <MuiListItem button selected={selected} onClick={onNavigate}>
            <ListItemIcon>
                <ListIcon />
            </ListItemIcon>
            <ListItemText
                primary={
                    <span>
                        {list.title}{' '}
                        <Badge
                            badgeContent={taskCount}
                            max={99}
                            sx={{ ml: 2, '& .MuiBadge-badge': { bgcolor: 'text.disabled' } }}
                            color="primary"
                        />
                    </span>
                }
            />

            {enableOptions && (
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        onClick={onOptions}
                        aria-label="Options"
                        title="Options"
                        size="large"
                    >
                        <MoreVertIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </MuiListItem>
    );
}
