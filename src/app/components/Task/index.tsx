import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { EditTaskMenu } from 'app/components/Menus/Task/EditTaskMenu';
import { getParticleCountFromTask } from 'app/components/Reward';
import { useRewarder } from 'app/components/Reward/context';
import { MemoLimitDateComponent } from 'app/components/Task/LimitDate';
import { MemoPriorityComponent } from 'app/components/Task/Priority';
import { Task, TaskInputProps, TaskState } from 'model/Task';
import { TaskPriority } from 'model/Task/Priority';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTaskListsSlice } from 'store/slices/taskLists';
import { Id } from 'utils/types';

interface TaskProps {
    listId: Id;
    task: Task;
}

export function TaskComponent({ task, listId }: TaskProps): React.ReactElement {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openOptions = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const closeOptions = () => setAnchorEl(null);

    const rewarder = useRewarder();

    const onTaskComplete = () => {
        if (rewarder !== null) {
            rewarder.handleFire({
                particleCount: getParticleCountFromTask(task),
            });
        }
    };

    const { actions } = useTaskListsSlice();

    const dispatch = useDispatch();

    const toggleTask = () => {
        const newState = task.state === TaskState.TODO ? TaskState.DONE : TaskState.TODO;

        dispatch(
            actions.setTaskState({
                listId,
                taskId: task.id,
                newTaskState: newState,
            }),
        );

        if (newState === TaskState.DONE) onTaskComplete();
    };

    const deleteTask = () => {
        dispatch(
            actions.deleteTask({
                listId,
                taskId: task.id,
            }),
        );
        closeOptions();
    };

    const archiveTask = () => {
        dispatch(
            actions.archiveTask({
                listId,
                taskId: task.id,
            }),
        );
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

    const editTask = (editedTask: TaskInputProps) => {
        closeEditMenu();
        dispatch(
            actions.editTask({
                listId,
                taskId: task.id,
                taskProps: editedTask,
            }),
        );
    };

    return (
        <>
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
                                            ? task.finishedDate!
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
                        size="large"
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
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <MenuItem onClick={openEditMenu} style={{ color: '#4e58ee' }}>
                            <EditIcon />
                            &nbsp;&nbsp;Edit task
                        </MenuItem>
                        <MenuItem onClick={archiveTask} style={{ color: 'orange' }}>
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
                <EditTaskMenu handleClose={closeEditMenu} handleSubmit={editTask} task={task} />
            )}
        </>
    );
}

export const MemoTaskComponent = React.memo(TaskComponent);
