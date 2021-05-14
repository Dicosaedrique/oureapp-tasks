/**
 *
 * Task
 *
 */
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import { Task, TaskState } from 'model/Task';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { messages } from './messages';
import { useTasksSlice } from './slice';
import styles from './Task.module.css';

interface Props extends Task {}

/**
 * basic component to render a task
 * @param props the task to display
 */
export function TaskComponent({ id, title, state }: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t } = useTranslation();

    const { actions } = useTasksSlice();

    const dispatch = useDispatch();

    const handleTaskState = (event: React.ChangeEvent<HTMLInputElement>) => {
        const finished = event.target.checked;

        dispatch(
            actions.setTaskState({
                id,
                taskState: finished ? TaskState.DONE : TaskState.TODO,
            }),
        );
    };

    const deleteTask = () => {
        dispatch(actions.removeTask(id));
    };

    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state === TaskState.DONE}
                        onChange={handleTaskState}
                    />
                }
                label={title}
            />
            <span
                className={styles.test}
                role="button"
                onClick={deleteTask}
                title={t(...messages.deleteTitle())}
            >
                <DeleteIcon />
            </span>
        </div>
    );
}
