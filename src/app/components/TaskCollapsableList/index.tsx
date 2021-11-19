import styled from '@emotion/styled';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Task, TaskState } from 'model/Task';
import React from 'react';
import { Id } from 'utils/types';

import { MemoTaskComponent } from '../Task';

export interface TaskCollapsableListProps {
    listId: Id;
    title: string;
    tasks: Task[];
}

export default function TaskCollapsableList({
    listId,
    title,
    tasks,
}: TaskCollapsableListProps): React.ReactElement {
    const [open, setOpen] = React.useState(true);

    const toggleOpen = () => setOpen(!open);

    // count tasks to be done (to display it next to the task list title)
    const remainingTasks = tasks.filter(task => task.state === TaskState.TODO).length;

    return (
        <>
            <ListItem button onClick={toggleOpen} selected={open}>
                <ListItemText
                    primary={
                        <span>
                            <TaskListTitle>{title}</TaskListTitle>
                            {remainingTasks > 0 && ` (${remainingTasks} remaining tasks)`}
                        </span>
                    }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {tasks.map(task => (
                        <MemoTaskComponent key={task.id} listId={listId} task={task} />
                    ))}
                </List>
            </Collapse>
        </>
    );
}

const TaskListTitle = styled.span`
    font-weight: bold;
    font-size: 1.1em;
    margin-right: 0.4em;
`;

export const MemoTaskCollapsableList = React.memo(TaskCollapsableList);
