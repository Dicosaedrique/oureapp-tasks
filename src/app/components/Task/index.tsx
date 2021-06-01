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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Task, TaskInputProps, TaskState } from 'model/Task';
import { TaskPriority } from 'model/Task/Priority';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { TaskMenu } from '../Menus/Task/TaskMenu';
import { getParticleCountFromTask } from '../Reward';
import { useRewarder } from '../Reward/context';
import { MemoLimitDateComponent } from './LimitDate';
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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const openOptions = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeOptions = () => {
        setAnchorEl(null);
    };

    const rewarder = useRewarder();

    const onTaskComplete = () => {
        if (rewarder !== null) {
            rewarder.handleFire({
                particleCount: getParticleCountFromTask(task),
            });
        }
    };

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
        closeOptions();
    };

    const archiveTask = () => {
        dispatch(actions.archiveTask(task.id));
        closeOptions();
    };

    //////////////////
    // HANDLE EDITION

    const [editMenuOpen, setEditMenuOpen] = React.useState(false);

    const openEditMenu = () => {
        setEditMenuOpen(true);
        closeOptions();
    };

    const closeEditMenu = () => setEditMenuOpen(false);

    const editTask = (inputProps: TaskInputProps, id?: string) => {
        closeEditMenu();
        if (!id) return;
        dispatch(actions.editTask({ id, props: inputProps }));
    };

    return (
        <>
            <ListItem
                button
                onClick={toggleTask}
                disableRipple
                disableTouchRipple
            >
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
                            <span style={{ marginRight: '1em' }}>
                                {task.title}
                            </span>
                            {task.priority !== TaskPriority.NONE && (
                                <MemoPriorityComponent
                                    priority={task.priority}
                                />
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
                        onClick={openOptions}
                        aria-label="Options"
                        title="Options"
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="task-options-menu"
                        aria-haspopup="true"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeOptions}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem
                            onClick={openEditMenu}
                            style={{ color: '#4e58ee' }}
                        >
                            <EditIcon />
                            &nbsp;&nbsp;Edit task
                        </MenuItem>
                        <MenuItem
                            onClick={archiveTask}
                            style={{ color: 'orange' }}
                        >
                            <ArchiveIcon />
                            &nbsp;&nbsp;Archive task
                        </MenuItem>
                        <MenuItem onClick={deleteTask} style={{ color: 'red' }}>
                            <DeleteIcon />
                            &nbsp;&nbsp;Delete task
                        </MenuItem>
                    </Menu>
                </ListItemSecondaryAction>
            </ListItem>
            {editMenuOpen && (
                <TaskMenu
                    handleClose={closeEditMenu}
                    handleSuccess={editTask}
                    id={task.id}
                    defaultTask={task}
                />
            )}
        </>
    );
}

export const MemoTaskComponent = React.memo(TaskComponent);
