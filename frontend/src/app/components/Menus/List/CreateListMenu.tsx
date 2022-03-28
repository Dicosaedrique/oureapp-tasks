import { ListMenu } from 'app/components/Menus/List/ListMenu';
import { TaskListInputProps } from 'model/TaskList';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTaskListsSlice } from 'store/slices/taskLists';

export interface CreateListMenuProps {
    open: boolean;
    handleClose: () => void;
}

export function CreateListMenu({ open, handleClose }: CreateListMenuProps): React.ReactElement {
    const dispatch = useDispatch();
    const { actions } = useTaskListsSlice();

    const handleCreateList = (listProps: TaskListInputProps) => {
        dispatch(actions.createList({ listProps }));
        handleClose();
    };

    return (
        <ListMenu
            open={open}
            dialogTitle="Create task list"
            handleClose={handleClose}
            handleSubmit={handleCreateList}
            submitButtonTitle="Create"
        />
    );
}
