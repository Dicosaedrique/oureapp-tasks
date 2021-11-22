import { ListMenu } from 'app/components/Menus/List/ListMenu';
import { TaskListInputProps, TaskListStats } from 'model/TaskList';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTaskListsSlice } from 'store/slices/taskLists';

export interface EditListMenuProps {
    open: boolean;
    list: TaskListStats | null;
    handleClose: () => void;
}

export function EditListMenu({
    open,
    list,
    handleClose,
}: EditListMenuProps): React.ReactElement | null {
    const dispatch = useDispatch();
    const { actions } = useTaskListsSlice();

    if (!open || list === null) return null;

    const handleEditList = (listProps: TaskListInputProps) => {
        dispatch(actions.editList({ id: list.id, listProps }));
        handleClose();
    };

    return (
        <ListMenu
            open={open}
            dialogTitle={`Edit '${list.title}' list`}
            handleClose={handleClose}
            handleSubmit={handleEditList}
            defaultListProps={list}
            submitButtonTitle="Save"
        />
    );
}
