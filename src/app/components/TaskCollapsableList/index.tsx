import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Task, TaskState } from 'model/Task';
import React from 'react';
import styled from 'styled-components/macro';
import { Id } from 'utils/types';

import { MemoTaskComponent } from '../Task';

export interface TaskCollapsableListProps {
    listId: Id;
    title: string;
    tasks: Task[];
}

export default function TaskCollapsableList({ listId, title, tasks }: TaskCollapsableListProps) {
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
