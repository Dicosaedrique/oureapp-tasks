/**
 *
 * defines the task list drawer section (to navigate in the app)
 *
 */

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import { TasksPagePathParams } from 'app/pages/TasksPage';
import { DEFAULT_LIST_ID } from 'model/TaskList';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
    selectDefaultTaskListBase,
    selectTaskListsBaseOrderedByCreationDate,
} from 'store/slices/taskLists/selectors';
import { ID } from 'utils/types';

/**
 * Displays the navigation's drawer section relative to tasks lists
 */
export default function TaskListsDrawerSection() {
    let current = useParams<TasksPagePathParams>().taskListId;
    if (current === undefined) current = DEFAULT_LIST_ID;

    const defaultList = useSelector(selectDefaultTaskListBase);

    const lists = useSelector(selectTaskListsBaseOrderedByCreationDate).filter(
        list => list.id !== DEFAULT_LIST_ID,
    );

    const history = useHistory();
    const createTaskListNavigationHandler = (id: ID) => () => history.push(`/tasks/${id}/`);
    const defaultTaskListNavigationHandler = () => history.push(`/tasks/`);

    return (
        <>
            <List>
                <ListItem
                    button
                    selected={current === defaultList.id}
                    onClick={defaultTaskListNavigationHandler}
                >
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary={defaultList.title} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {lists.map(({ id, title }) => (
                    <ListItem
                        button
                        selected={current === id}
                        onClick={createTaskListNavigationHandler(id)}
                        key={id}
                    >
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}

export const MemoTaskListsDrawerSection = React.memo(TaskListsDrawerSection);
