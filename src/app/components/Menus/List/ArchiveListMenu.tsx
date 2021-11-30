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
    archive?: boolean;
}

export function ArchiveListDialog({
    open,
    list,
    handleClose,
    handleSelfArchive,
    archive = false,
}: ArchiveListDialogProps): React.ReactElement | null {
    const { actions } = useTaskListsSlice();
    const dispatch = useDispatch();

    const archiveList = () => {
        if (list === null) return;

        const payload = { id: list.id };

        if (archive) {
            dispatch(actions.unarchiveList(payload));
            handleSelfArchive();
        } else {
            dispatch(actions.archiveList(payload));
            handleSelfArchive();
        }

        handleClose();
    };

    if (!open || list == null) return null;

    return (
        <ConfirmDialog
            open
            handleSuccess={archiveList}
            handleClose={handleClose}
            title={`Are you sure you want to ${archive ? 'unarchive' : 'archive'} the task list '${
                list.title
            }' ?`}
            description={
                archive
                    ? 'If you unarchive this list, every archived task will be unarchived.'
                    : `If you archive this list, you won't see it anymore in your list drawer and all the tasks in it will be archived too. You can unarchive a list or a task from the archive.`
            }
            confirmButton={archive ? 'Unarchive' : 'Archive'}
            closeButton="Cancel"
        />
    );
}
