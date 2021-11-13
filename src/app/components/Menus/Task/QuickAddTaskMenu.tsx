import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useTaskListsSlice } from 'store/slices/taskLists';
import { Id } from 'utils/types';

export interface QuickAddTaskMenuProps {
    taskListId: Id;
}

export function QuickAddTaskMenu({ taskListId }: QuickAddTaskMenuProps) {
    const [title, setTitle] = React.useState('');

    const { actions } = useTaskListsSlice();
    const dispatch = useDispatch();

    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

    const createTask = () => {
        const finalTitle = title.trim();

        if (finalTitle.length > 0) {
            setTitle('');
            dispatch(
                actions.addTask({
                    taskListId,
                    taskProps: {
                        title: finalTitle,
                    },
                }),
            );
        }
    };

    const onKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTask();
        }
    };

    return (
        <TextField
            label="Add task"
            variant="outlined"
            value={title}
            onChange={onTitleChange}
            onKeyPress={onKeyPressed}
        />
    );
}
