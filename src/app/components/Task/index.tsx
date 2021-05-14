/**
 *
 * Task
 *
 */
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { Task, TaskState } from 'model/Task';
import { TaskPriority } from 'model/Task/Priority';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { messages } from './messages';
import { PriorityComponent } from './Priority';
import { useTasksSlice } from './slice';

interface Props extends Task {}

/**
 * basic component to render a task
 * @param props the task to display
 */
export function TaskComponent({ id, title, priority, state }: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t } = useTranslation();

    const { actions } = useTasksSlice();

    const dispatch = useDispatch();

    const toggleTask = () => {
        const newState =
            state === TaskState.TODO ? TaskState.DONE : TaskState.TODO;

        dispatch(
            actions.setTaskState({
                id,
                taskState: newState,
            }),
        );
    };

    const deleteTask = () => {
        dispatch(actions.removeTask(id));
    };

    return (
        <ListItem button onClick={toggleTask} disableRipple disableTouchRipple>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={state === TaskState.DONE}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': id }}
                />
            </ListItemIcon>
            <ListItemText
                id={id}
                primary={
                    <>
                        <span style={{ marginRight: '1em' }}>{title}</span>
                        {priority !== TaskPriority.NONE && (
                            <PriorityComponent priority={priority} />
                        )}
                    </>
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    onClick={deleteTask}
                    aria-label={t(...messages.deleteTitle())}
                    title={t(...messages.deleteTitle())}
                    color="secondary"
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
