import { TaskState } from 'model/Task';
import { TASKS_COMPARERS_ASC, TASKS_COMPARERS_DES, TaskStateComparers } from 'model/Task/Sort';
import { createSelector } from 'reselect';
import { initialState } from 'store/slices/taskSorting';
import { RootState } from 'store/StoreRootState';

const selectSlice = (state: RootState) => state?.taskSorting || initialState;

/**
 * selector for sorting
 * @returns the "sorting" slice of global state
 */
export const selectSorting = selectSlice;

/**
 * @returns the sorting mode
 */
export const selectSortingMode = createSelector(selectSorting, sorting => sorting.mode);

/**
 * @returns the sorting order
 */
export const selectSortingOrder = createSelector(selectSorting, sorting => sorting.order);

/**
 * @returns the task comparer based on sorting order
 */
export const selectTaskComparers = createSelector(selectSortingOrder, order =>
    order ? TASKS_COMPARERS_ASC : TASKS_COMPARERS_DES,
);

/**
 * @returns the task state comparer based on sorting order
 */
export const selectTaskStateComparers = createSelector(
    selectTaskComparers,
    selectSortingMode,
    (comparers, mode): TaskStateComparers => ({
        [TaskState.TODO]: comparers[TaskState.TODO][mode],
        [TaskState.DONE]: comparers[TaskState.DONE][mode],
    }),
);
