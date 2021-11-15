import { ListMenu } from 'app/components/Menus/List/ListMenu';
import { TaskListInputProps } from 'model/TaskList';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTaskListsSlice } from 'store/slices/taskLists';

export interface CreateListMenuProps {
    handleClose: () => void;
}

export function CreateListMenu({ handleClose }: CreateListMenuProps): React.ReactElement {
    const dispatch = useDispatch();
    const { actions } = useTaskListsSlice();

    const handleCreateList = (listProps: TaskListInputProps) => {
        dispatch(actions.createList({ listProps }));
        handleClose();
    };

    return (
        <ListMenu
            dialogTitle="Create task list"
            handleClose={handleClose}
            handleSubmit={handleCreateList}
            submitButtonTitle="Create"
        />
    );
}
