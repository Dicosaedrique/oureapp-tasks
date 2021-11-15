import { ListMenu } from 'app/components/Menus/List/ListMenu';
import { TaskListBase, TaskListInputProps } from 'model/TaskList';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTaskListsSlice } from 'store/slices/taskLists';

export interface EditListMenuProps {
    list: TaskListBase;
    handleClose: () => void;
}

export function EditListMenu({ list, handleClose }: EditListMenuProps): React.ReactElement {
    const dispatch = useDispatch();
    const { actions } = useTaskListsSlice();

    const handleEditList = (listProps: TaskListInputProps) => {
        dispatch(actions.editList({ id: list.id, listProps }));
        handleClose();
    };

    return (
        <ListMenu
            dialogTitle={`Edit '${list.title}' list`}
            handleClose={handleClose}
            handleSubmit={handleEditList}
            defaultListProps={list}
            submitButtonTitle="Save"
        />
    );
}
