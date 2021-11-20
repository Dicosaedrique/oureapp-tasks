import { ConfirmDialog } from 'app/components/Utils/ConfirmDialog';
import { TaskListStats } from 'model/TaskList';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTaskListsSlice } from 'store/slices/taskLists';

interface DeleteListDialogProps {
    open: boolean;
    list: TaskListStats | null;
    handleClose: () => void;
    handleSelfDelete: () => void;
}

export function DeleteListDialog({
    open,
    list,
    handleClose,
    handleSelfDelete,
}: DeleteListDialogProps): React.ReactElement | null {
    const { actions } = useTaskListsSlice();
    const dispatch = useDispatch();

    const deleteList = () => {
        if (list === null) return;
        dispatch(actions.deleteList({ id: list.id }));
        handleClose();
        handleSelfDelete();
    };

    if (!open || list == null) return null;

    return (
        <ConfirmDialog
            open
            handleSuccess={deleteList}
            handleClose={handleClose}
            title={`Are you sure you want to delete the task list '${list.title}' ?`}
            description={`If you delete this list, the tasks in it will be deleted too and you won't be able to retrieve them. There is ${list.taskCount} tasks in this list (including ${list.taskToDoCount} to do).`}
            confirmButton="Delete"
            closeButton="Cancel"
        />
    );
}
