/**
 *
 * define a task category (here a task container)
 *
 */
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Category } from 'model/Category';
import { Task, TaskState } from 'model/Task';
import * as React from 'react';
import styled from 'styled-components/macro';

import { TaskComponent } from '../../Task';

export interface CategoryContainerProps extends Category {
    tasks: Task[];
}

/**
 * Display a list of tasks
 * @param props list of tasks
 */
export function CategoryContainer({ title, tasks }: CategoryContainerProps) {
    const [open, setOpen] = React.useState(true);

    const toggleOpen = () => setOpen(!open);

    // count tasks to be done (to display it next to the category title)
    const remainingTasks = tasks.filter(task => task.state === TaskState.TODO)
        .length;

    return (
        <>
            <ListItem button onClick={toggleOpen} selected={open}>
                <ListItemText
                    primary={
                        <span>
                            <CategoryTitle>{title}</CategoryTitle>
                            {remainingTasks > 0 &&
                                ` (${remainingTasks} remaining tasks)`}
                        </span>
                    }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {tasks.map(task => (
                        <TaskComponent key={task.id} task={task} />
                    ))}
                </List>
            </Collapse>
        </>
    );
}

const CategoryTitle = styled.span`
    font-weight: bold;
    font-size: 1.1em;
    margin-right: 0.4em;
`;
