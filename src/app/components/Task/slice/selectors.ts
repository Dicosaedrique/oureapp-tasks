import { TaskState } from 'model/Task';
import { createSelector } from 'reselect';
import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.tasks || initialState;

/**
 * selector for tasks
 * @returns the "tasks" slice of global state
 */
export const selectTasks = createSelector([selectSlice], state => state);

/**
 * @returns the task list (all)
 */
export const selectTasksList = createSelector(
    selectTasks,
    tasksState => tasksState.list,
);

/**
 * @returns the preferences of the tasks slice
 */
export const selectPreferences = createSelector(
    selectTasks,
    tasksState => tasksState.preferences,
);

/**
 * @returns the priority preferences of the tasks slice
 */
export const selectPriorityPreferences = createSelector(
    selectPreferences,
    preferences => preferences.priority,
);

/**
 * @returns the tasks in state "TODO" (!depracated)
 */
export const selectTodoTasks = createSelector(selectTasksList, list =>
    list.filter(task => task.state === TaskState.TODO),
);

/**
 * @returns the tasks in state "DONE" (!depracated)
 */
export const selectDoneTasks = createSelector(selectTasksList, list =>
    list.filter(task => task.state === TaskState.DONE),
);
