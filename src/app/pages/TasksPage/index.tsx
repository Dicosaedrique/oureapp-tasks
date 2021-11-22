import { FilteringMenu } from 'app/components/Menus/Filtering';
import { SortingMenu } from 'app/components/Menus/Sorting';
import { CreateTaskMenu } from 'app/components/Menus/Task/CreateTaskMenu';
import { RewarderProvider } from 'app/components/Reward/context';
import { MemoTaskCollapsableList } from 'app/components/TaskCollapsableList';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';
import BasePage from 'app/pages/Templates/BasePage';
import { TASK_STATE_NAMES, TaskState } from 'model/Task';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectSmartTasksByListId, selectTaskListBaseById } from 'store/slices/taskLists/selectors';
import { TaskListsSliceState } from 'store/slices/taskLists/types';
import { mapObject } from 'utils';
import { Id } from 'utils/types';

export interface TasksPagePathParams {
    id: Id;
}

export default function TasksPage(): React.ReactElement {
    const params = useParams() as TasksPagePathParams;

    const taskListBase = useSelector((state: TaskListsSliceState) =>
        selectTaskListBaseById(state, params.id),
    );
    const tasks = useSelector((state: TaskListsSliceState) =>
        selectSmartTasksByListId(state, params.id),
    );

    if (taskListBase === undefined || tasks === undefined) return <NotFoundPage />; // todo : fix this with error handling

    return (
        <BasePage title={taskListBase.title}>
            <RewarderProvider>
                <div style={{ margin: 'auto 0.5em 1.5em auto' }}>
                    <FilteringMenu />
                    <SortingMenu />
                </div>
                {mapObject(tasks, (tasks, taskState) => {
                    if (tasks.length === 0) return null;
                    else
                        return (
                            <MemoTaskCollapsableList
                                key={taskState}
                                listId={taskListBase.id}
                                title={TASK_STATE_NAMES[taskState]}
                                tasks={tasks}
                                defaultOpen={taskState.toString() === TaskState.TODO.toString()}
                                style={{ marginBottom: '1em' }}
                            />
                        );
                })}
                <div style={{ margin: '1.5em auto auto auto' }}>
                    <CreateTaskMenu listId={taskListBase.id} />
                </div>
            </RewarderProvider>
        </BasePage>
    );
}
