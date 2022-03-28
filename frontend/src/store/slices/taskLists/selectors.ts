import { Task, TaskState } from 'model/Task';
import { getFilterFromSettings } from 'model/Task/Filter';
import TaskList, {
    DEFAULT_LIST_ID,
    listCreationDateComparer,
    mapListToListStats,
    TaskListStats,
    TaskStateDictionnary,
} from 'model/TaskList';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { selectFilteringSettings } from 'store/slices/taskFiltering/selectors';
import { initialState } from 'store/slices/taskLists';
import { TaskListsSliceState } from 'store/slices/taskLists/types';
import { selectTaskStateComparers } from 'store/slices/taskSorting/selectors';
import { RootState } from 'store/StoreRootState';
import { recordToArray } from 'utils';
import { Id } from 'utils/types';

/////////////////////////////////////////
// SELECTORS

const selectSlice = (state: RootState): TaskListsSliceState => state?.taskLists || initialState;

export const selectTaskLists = selectSlice;

/**
 * returns all stats lists ordered by creation date and based on archive mode
 * in archive mode only returns the lists archived or containing archived tasks
 * in normal mode only returns the lists not archived
 */
export const selectSmartLists = createSelector(
    selectTaskLists,
    (_: TaskListsSliceState, archive: boolean) => archive,
    (taskLists, archive): TaskListStats[] => {
        const lists = recordToArray(taskLists as Record<Id, TaskList>);

        let filteredLists: TaskList[];
        if (archive) {
            filteredLists = lists.filter(
                taskList => taskList.isArchived || taskList.archivedTasks.length > 0,
            );
        } else {
            filteredLists = lists.filter(taskList => !taskList.isArchived);
        }

        return filteredLists.sort(listCreationDateComparer).map(mapListToListStats);
    },
);

/**
 * returns the default task list as a stats list
 */
export const selectDefaultListStat = createSelector(selectTaskLists, taskLists =>
    mapListToListStats(taskLists[DEFAULT_LIST_ID]!),
);

/**
 * returns a stats list for the given id
 */
export const selectListStatsById = createSelector(selectTaskLists, getId, (taskLists, id) =>
    taskLists[id] !== undefined ? mapListToListStats(taskLists[id]!) : undefined,
);

/**
 * returns the task list for a given id
 */
export const selectListById = createSelector(
    selectTaskLists,
    getId,
    (taskLists, id) => taskLists[id],
);

/**
 * returns tasks of the given list id sorted and filtered using the correct settings
 */
export const selectSmartTasksByListId = createSelector(
    selectTaskLists,
    getId,
    (_: TaskListsSliceState, __: Id, archive: boolean) => archive,
    selectFilteringSettings,
    selectTaskStateComparers,
    (taskLists, id, archive, filteringSettings, taskStateComparers) => {
        const list = taskLists[id];

        if (list !== undefined) {
            const tasks = archive ? list.archivedTasks : list.tasks;

            const res = getTaskStateDictionnaryFromTasks(tasks);
            const finalFilter = getFilterFromSettings(filteringSettings);

            for (const taskState in res) {
                if (res[taskState] !== undefined)
                    res[taskState] = res[taskState]
                        .filter(finalFilter)
                        .sort(taskStateComparers[taskState]);
            }

            return res;
        } else return undefined;
    },
);

/////////////////////////////////////////
// HOOKS

export function useSmartTaskSelector(
    id: Id,
    archive: boolean,
): TaskStateDictionnary<Task[]> | undefined {
    return useSelector((state: TaskListsSliceState) =>
        selectSmartTasksByListId(state, id, archive),
    );
}

export function useListStatsByIdSelector(id: Id): TaskListStats | undefined {
    return useSelector((state: TaskListsSliceState) => selectListStatsById(state, id));
}

export function useSmartListsSelector(archive: boolean): TaskListStats[] {
    return useSelector((state: TaskListsSliceState) => selectSmartLists(state, archive));
}

/////////////////////////////////////////
// UTILS

function getTaskStateDictionnaryFromTasks(tasks: Task[]): TaskStateDictionnary<Task[]> {
    return {
        [TaskState.TODO]: tasks.filter(task => task.state === TaskState.TODO),
        [TaskState.DONE]: tasks.filter(task => task.state === TaskState.DONE),
    };
}

function getId(_: TaskListsSliceState, id: Id): Id {
    return id;
}
