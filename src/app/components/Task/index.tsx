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

import { getParticleCountFromTask } from '../Reward';
import { useRewarder } from '../Reward/context';
import { MemoLimitDateComponent } from './LimitDate';
import { messages } from './messages';
import { MemoPriorityComponent } from './Priority';
import { useTasksSlice } from './slice';

interface Props {
    task: Task;
}

/**
 * basic component to render a task
 * @param props the task to display
 */
export function TaskComponent({ task }: Props) {
    const rewarder = useRewarder();

    const onTaskComplete = () => {
        if (rewarder !== null) {
            rewarder.handleFire({
                particleCount: getParticleCountFromTask(task),
            });
        }
    };

    const { t } = useTranslation();

    const { actions } = useTasksSlice();

    const dispatch = useDispatch();

    const toggleTask = () => {
        const newState =
            task.state === TaskState.TODO ? TaskState.DONE : TaskState.TODO;

        dispatch(
            actions.setTaskState({
                id: task.id,
                taskState: newState,
            }),
        );

        if (newState === TaskState.DONE) onTaskComplete();
    };

    const deleteTask = () => {
        dispatch(actions.removeTask(task.id));
    };

    return (
        <ListItem button onClick={toggleTask} disableRipple disableTouchRipple>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={task.state === TaskState.DONE}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': task.id }}
                />
            </ListItemIcon>
            <ListItemText
                id={task.id}
                primary={
                    <>
                        <span style={{ marginRight: '1em' }}>{task.title}</span>
                        {task.priority !== TaskPriority.NONE && (
                            <MemoPriorityComponent priority={task.priority} />
                        )}
                        {task.limitDate !== undefined && (
                            <MemoLimitDateComponent
                                nowDate={
                                    task.state === TaskState.DONE
                                        ? task.finishedDate || 0
                                        : Date.now()
                                }
                                startDate={task.creationDate}
                                limitDate={task.limitDate}
                                taskState={task.state}
                            />
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

export const MemoTaskComponent = React.memo(TaskComponent);
