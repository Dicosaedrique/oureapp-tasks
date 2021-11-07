import { Task, TaskState } from 'model/Task';
import { getFilterFromSettings } from 'model/Task/Filter';
import TaskList, { DEFAULT_LIST_ID, TaskListBase, TaskStateDictionnary } from 'model/TaskList';
import { createSelector } from 'reselect';
import { selectFilteringSettings } from 'store/slices/taskFiltering/selectors';
import { initialState } from 'store/slices/taskLists';
import { selectTaskStateComparers } from 'store/slices/taskSorting/selectors';
import { RootState } from 'store/StoreRootState';
import { recordToArray } from 'utils';
import { Id } from 'utils/types';

const selectSlice = (state: RootState) => state?.taskLists || initialState;

export const selectTaskLists = selectSlice;

export const selectTaskListsBaseOrderedByCreationDate = createSelector(
    selectTaskLists,
    taskLists =>
        recordToArray(taskLists as Record<Id, TaskList>).sort((a, b) => {
            if (a.creationDate < b.creationDate) return -1;
            if (a.creationDate > b.creationDate) return 1;
            return 0;
        }) as TaskListBase[],
);

export const selectDefaultTaskListBase = createSelector(
    selectTaskLists,
    taskLists => taskLists[DEFAULT_LIST_ID] as TaskListBase,
);

export const selectTaskListBaseById = createSelector(
    selectTaskLists,
    (_, id: Id) => id,
    (taskLists, id) => taskLists[id] as TaskListBase,
);

export const selectTaskListById = createSelector(
    selectTaskLists,
    (_, id: Id) => id,
    (taskLists, id) => taskLists[id],
);

export const selectTasksByListId = createSelector(selectTaskListById, res => res?.tasks);

// returns tasks from the task list Id, sorted and filtered by the right settings
export const selectSmartTasksByListId = createSelector(
    selectTasksByListId,
    selectFilteringSettings,
    selectTaskStateComparers,
    (tasks, filteringSettings, taskStateComparers) => {
        if (tasks === undefined) return undefined;

        const res = getTaskStateDictionnaryFromTasks(tasks);
        const finalFilter = getFilterFromSettings(filteringSettings);

        for (const taskState in res) {
            if (res[taskState] !== undefined)
                res[taskState] = res[taskState]
                    .filter(finalFilter)
                    .sort(taskStateComparers[taskState]);
        }

        return res;
    },
);

function getTaskStateDictionnaryFromTasks(tasks: Task[]): TaskStateDictionnary<Task[]> {
    return {
        [TaskState.TODO]: tasks.filter(task => task.state === TaskState.TODO),
        [TaskState.DONE]: tasks.filter(task => task.state === TaskState.DONE),
    };
}
