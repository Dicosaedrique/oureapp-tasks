import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FilteringMenu } from 'app/components/Menus/Filtering';
import { SortingMenu } from 'app/components/Menus/Sorting';
import { CreateTaskMenu } from 'app/components/Menus/Task/CreateTaskMenu';
import { RewarderProvider } from 'app/components/Reward/context';
import { MemoTaskCollapsableList } from 'app/components/TaskCollapsableList';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';
import BasePage from 'app/pages/Templates/BasePage';
import { TASK_STATE_NAMES } from 'model/Task';
import { DEFAULT_LIST_ID } from 'model/TaskList';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectSmartTasksByListId, selectTaskListBaseById } from 'store/slices/taskLists/selectors';
import { mapObject } from 'utils';
import { Id } from 'utils/types';

export interface TasksPagePathParams {
    listId: Id;
}

export default function TasksPage(): React.ReactElement {
    const classes = useStyles();

    let { listId } = useParams<TasksPagePathParams>();
    if (listId === undefined) listId = DEFAULT_LIST_ID;

    const taskListBase = useSelector(state => selectTaskListBaseById(state, listId));
    const tasks = useSelector(state => selectSmartTasksByListId(state, listId));

    if (taskListBase === undefined || tasks === undefined) return <NotFoundPage />; // todo : fix this with error handling

    return (
        <BasePage title={taskListBase.title}>
            <RewarderProvider>
                <div className={classes.toolbar} />
                <FilteringMenu />
                <SortingMenu />
                {mapObject(tasks, (tasks, taskState) => {
                    if (tasks.length === 0) return null;
                    else
                        return (
                            <MemoTaskCollapsableList
                                key={taskState}
                                listId={taskListBase.id}
                                title={TASK_STATE_NAMES[taskState]}
                                tasks={tasks}
                            />
                        );
                })}
                <div style={{ margin: '1em auto' }}>
                    <CreateTaskMenu listId={taskListBase.id} />
                </div>
            </RewarderProvider>
        </BasePage>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            ...theme.mixins.toolbar,
        },
    }),
);
