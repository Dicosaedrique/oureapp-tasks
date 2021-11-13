import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useTaskListsSlice } from 'store/slices/taskLists';
import { Id } from 'utils/types';

export interface QuickAddTaskMenuProps {
    listId: Id;
}

export function AddTaskMenu({ listId }: QuickAddTaskMenuProps) {
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
                    listId,
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
            fullWidth
            InputProps={
                title.length > 0
                    ? {
                          endAdornment: (
                              <IconButton
                                  color="primary"
                                  aria-label="Add task"
                                  component="span"
                                  onClick={createTask}
                              >
                                  <AddCircleIcon />
                              </IconButton>
                          ),
                      }
                    : {}
            }
        />
    );
}
