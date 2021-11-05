import { Task } from 'model/Task';
import { getFilterFromSettings } from 'model/Task/Filter';
import TaskList, { DEFAULT_LIST_ID, TaskListBase } from 'model/TaskList';
import { createSelector } from 'reselect';
import { selectFilteringSettings } from 'store/slices/taskFiltering/selectors';
import { initialState } from 'store/slices/taskLists';
import { selectTaskStateComparers } from 'store/slices/taskSorting/selectors';
import { RootState } from 'store/StoreRootState';
import { recordToArray } from 'utils';
import { ID } from 'utils/types';

const selectSlice = (state: RootState) => state?.taskLists || initialState;

/**
 * selector for task lists
 * @returns the "taskLists" slice of global state
 */
export const selectTaskLists = selectSlice;

/**
 * selector for all categories ordered by creation date
 * @param {string} id id of the task list to get
 * @return selector for the given task list
 */
export const selectTaskListsBaseOrderedByCreationDate = createSelector(
    selectTaskLists,
    taskLists =>
        recordToArray(taskLists as Record<ID, TaskList>).sort((a, b) => {
            if (a.creationDate < b.creationDate) return -1;
            if (a.creationDate > b.creationDate) return 1;
            return 0;
        }) as TaskListBase[],
);

export const selectDefaultTaskListBase = createSelector(
    selectTaskLists,
    taskLists => taskLists[DEFAULT_LIST_ID] as TaskListBase,
);

/**
 * selector for task lists by ID
 * @param {string} id id of the list to get
 * @return selector for the given task list (can be undefined)
 */
export const selectTaskListBaseByID = createSelector(
    selectTaskLists,
    (_, id: ID) => id,
    (taskLists, id) => taskLists[id],
);

/**
 * smart selector for task lists by ID (filter and sort them)
 * @param {string} id id of the list to get
 * @return task list with tasks sorted and filtered for the given task list id (can be undefined)
 */
export const selectSmartTaskListByID = createSelector(
    selectTaskListBaseByID,
    selectFilteringSettings,
    selectTaskStateComparers,
    (taskList, filteringSettings, taskStateComparers) => {
        if (taskList === undefined) return undefined;

        const finalFilter = getFilterFromSettings(filteringSettings);

        for (const taskState in taskList.tasks) {
            taskList.tasks[taskState] = taskList.tasks[taskState].filter(finalFilter);
            (taskList.tasks[taskState] as Task[]).sort(taskStateComparers[taskState]);
        }

        return taskList;
    },
);
