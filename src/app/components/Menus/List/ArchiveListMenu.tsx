import { ConfirmDialog } from 'app/components/Utils/ConfirmDialog';
import { TaskListStats } from 'model/TaskList';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTaskListsSlice } from 'store/slices/taskLists';

interface ArchiveListDialogProps {
    open: boolean;
    list: TaskListStats | null;
    handleClose: () => void;
    handleSelfArchive: () => void;
}

export function ArchiveListDialog({
    open,
    list,
    handleClose,
    handleSelfArchive,
}: ArchiveListDialogProps): React.ReactElement | null {
    const { actions } = useTaskListsSlice();
    const dispatch = useDispatch();

    const archiveList = () => {
        if (list === null) return;
        dispatch(actions.archiveList({ id: list.id }));
        handleClose();
        handleSelfArchive();
    };

    if (!open || list == null) return null;

    return (
        <ConfirmDialog
            open
            handleSuccess={archiveList}
            handleClose={handleClose}
            title={`Are you sure you want to archive the task list '${list.title}' ?`}
            description={`If you archive this list, you won't see it anymore in your list drawer and all the tasks in it will be archived too. You can unarchive a list or a task from the archive.`}
            confirmButton="Archive"
            closeButton="Cancel"
        />
    );
}
