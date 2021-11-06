import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FilteringMenu } from 'app/components/Menus/Filtering';
import { SortingMenu } from 'app/components/Menus/Sorting';
// import { AddTaskMenu } from 'app/components/Menus/Task/AddTaskMenu';
import { RewarderProvider } from 'app/components/Reward/context';
import { MemoTaskCollapsableList } from 'app/components/TaskCollapsableList';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';
import BasePage from 'app/pages/Templates/BasePage';
import { TASK_STATE_NAMES } from 'model/Task';
import { DEFAULT_LIST_ID } from 'model/TaskList';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectSmartTasksByListID, selectTaskListBaseByID } from 'store/slices/taskLists/selectors';
import { mapObject } from 'utils';
import { ID } from 'utils/types';

export interface TasksPagePathParams {
    taskListId: ID;
}

export default function TasksPage() {
    const classes = useStyles();

    let { taskListId } = useParams<TasksPagePathParams>();
    if (taskListId === undefined) taskListId = DEFAULT_LIST_ID;

    const taskListBase = useSelector(state => selectTaskListBaseByID(state, taskListId));
    const tasks = useSelector(state => selectSmartTasksByListID(state, taskListId));

    if (taskListBase === undefined || tasks === undefined) return <NotFoundPage />; // todo : fix this with error handling

    return (
        <BasePage title={taskListBase.title}>
            <RewarderProvider>
                <div className={classes.toolbar} />
                {/* <AddTaskMenu /> */}
                <FilteringMenu />
                <SortingMenu />
                {mapObject(tasks, (tasks, taskState) => (
                    <MemoTaskCollapsableList
                        key={taskState}
                        listId={taskListBase.id}
                        title={TASK_STATE_NAMES[taskState]}
                        tasks={tasks}
                    />
                ))}
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
