import styled from '@emotion/styled';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { MemoTask } from 'app/components/Task';
import { Task } from 'model/Task';
import React from 'react';
import { Id } from 'utils/types';

export interface TaskCollapsableListProps {
    listId: Id;
    title: string;
    tasks: Task[];
    defaultOpen: boolean;
}

export default function TaskCollapsableList({
    listId,
    title,
    tasks,
    defaultOpen,
}: TaskCollapsableListProps): React.ReactElement {
    const [open, setOpen] = React.useState(defaultOpen);
    const toggleOpen = () => setOpen(!open);

    return (
        <>
            <ListItem button onClick={toggleOpen} selected={open}>
                <ListItemText
                    primary={
                        <span>
                            <TaskListTitle>{title}</TaskListTitle>
                            {tasks.length > 0 && ` (${tasks.length} tasks)`}
                        </span>
                    }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {tasks.map(task => (
                        <MemoTask key={task.id} listId={listId} task={task} />
                    ))}
                </List>
            </Collapse>
        </>
    );
}

const TaskListTitle = styled.span`
    font-weight: bold;
    font-size: 1.1em;
    margin-right: 0.5em;
`;

export const MemoTaskCollapsableList = React.memo(TaskCollapsableList);
