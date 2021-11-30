import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ArchiveContextProvider } from 'app/components/Archive/context';
import { FilteringMenu } from 'app/components/Menus/Filtering';
import { SortingMenu } from 'app/components/Menus/Sorting';
import { CreateTaskMenu } from 'app/components/Menus/Task/CreateTaskMenu';
import { RewarderProvider } from 'app/components/Reward/context';
import { MemoTaskCollapsableList } from 'app/components/TaskCollapsableList';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';
import BasePage from 'app/pages/Templates/BasePage';
import { TASK_STATE_NAMES, TaskState } from 'model/Task';
import { TaskListStats } from 'model/TaskList';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTaskListsSlice } from 'store/slices/taskLists';
import { useListStatsByIdSelector, useSmartTaskSelector } from 'store/slices/taskLists/selectors';
import { mapObject } from 'utils';
import { Id } from 'utils/types';

export interface TasksPagePathParams {
    id: Id;
}

interface TasksPageProps {
    index?: boolean;
    archive?: boolean;
}

export default function TasksPage({
    index = false,
    archive = false,
}: TasksPageProps): React.ReactElement | null {
    const params = useParams() as TasksPagePathParams;

    const { actions } = useTaskListsSlice();
    const dispatch = useDispatch();

    const listStats = useListStatsByIdSelector(params.id);
    const tasks = useSmartTaskSelector(params.id, archive);

    if (index) {
        return (
            <ArchiveContextProvider archive={archive}>
                <BasePage title="Welcome">
                    <Typography variant="h4">
                        {archive
                            ? 'Welcome to your archive'
                            : 'Choose or create a task list to start'}
                    </Typography>
                </BasePage>
            </ArchiveContextProvider>
        );
    } else if (listStats !== undefined && tasks !== undefined) {
        const listEmpty = isListEmpty(listStats, archive);

        const handleArchiveDoneTasks = () => {
            dispatch(actions.archiveListDoneTasks({ id: params.id }));
        };

        return (
            <ArchiveContextProvider archive={archive}>
                <BasePage title={listStats.title}>
                    <RewarderProvider>
                        {listEmpty ? (
                            <Typography variant="h6">
                                {archive
                                    ? "You haven't archived any task in this list."
                                    : 'There is no tasks in this list.'}
                            </Typography>
                        ) : (
                            <>
                                <div style={{ margin: 'auto 0.5em 1.5em auto' }}>
                                    <FilteringMenu />
                                    <SortingMenu />
                                </div>
                                {mapObject(tasks, (tasks, taskState) => (
                                    <>
                                        {!archive &&
                                            taskState.toString() === TaskState.DONE.toString() &&
                                            tasks.length > 0 && (
                                                <Button
                                                    color="warning"
                                                    variant="contained"
                                                    sx={{ margin: '3em auto 1em auto' }}
                                                    onClick={handleArchiveDoneTasks}
                                                >
                                                    Archive done tasks
                                                </Button>
                                            )}
                                        <MemoTaskCollapsableList
                                            key={taskState}
                                            listId={listStats.id}
                                            title={TASK_STATE_NAMES[taskState]}
                                            tasks={tasks}
                                            defaultOpen={
                                                archive ||
                                                taskState.toString() === TaskState.TODO.toString()
                                            }
                                        />
                                    </>
                                ))}
                            </>
                        )}
                        {!archive && (
                            <div style={{ margin: '1.5em auto auto auto' }}>
                                <CreateTaskMenu listId={listStats.id} />
                            </div>
                        )}
                    </RewarderProvider>
                </BasePage>
            </ArchiveContextProvider>
        );
    } else {
        return <NotFoundPage />; // todo : fix this with error handling
    }
}

function isListEmpty(list: TaskListStats, archive: boolean) {
    return archive ? list.archiveTaskCount === 0 : list.taskCount === 0;
}
