import { groupBy } from 'lodash';
import {
    DEFAULT_CATEGORY,
    getTaskStateFromCategoryId,
    TASK_STATE_CATEGORIES,
} from 'model/Category';
import { TaskState } from 'model/Task';
import { TASKS_COMPARERS } from 'model/Task/Sort';
import { createSelector } from 'reselect';
import { RootState } from 'types';

import { CategoryContainerProps } from '../Category';
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
 * @returns the category list
 */
export const selectCategories = createSelector(
    selectTasks,
    tasksState => tasksState.categories,
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
 * @returns the limit date preferences of the tasks slice
 */
export const selectLimitDatePreferences = createSelector(
    selectPreferences,
    preferences => preferences.limitDate,
);

/**
 * @returns the categories preferences of the tasks slice
 */
export const selectCategoriesPreferences = createSelector(
    selectPreferences,
    preferences => preferences.categories,
);

/**
 * @returns the sorting preferences of the tasks slice
 */
export const selectSortingPreferences = createSelector(
    selectPreferences,
    preferences => preferences.sorting,
);

/**
 * TODO : THIS PROBABLY NEEDS OTPIMIZATION AS IT TAKES TOO MANY PARAMETERS AND UPDATE TOO OFTEN THE WHOLE APP !!!
 *
 * Selector that will separate tasks by state or by category based on category preferences
 * @returns an array of "CategoryContainer" props
 */
export const selectSmartSeparatedTasks = createSelector(
    selectCategories,
    selectTasksList,
    selectCategoriesPreferences,
    selectSortingPreferences,
    (categories, tasksList, categoriesPreferences, sortingMode) => {
        const res: CategoryContainerProps[] = [];

        // separate tasks by categories
        if (categoriesPreferences.enableCategoriesSeparation) {
            const groupedByCategories = groupBy(tasksList, 'category');

            // for each category
            for (const category in groupedByCategories) {
                // if associated category exists, push it in the res
                if (category in categories) {
                    res.push({
                        ...categories[category],
                        tasks: groupedByCategories[category],
                    });
                }
                // manage tasks without categories (lodash.groupby transform undefined values in string)
                else if (category === 'undefined') {
                    res.push({
                        ...DEFAULT_CATEGORY,
                        tasks: groupedByCategories[category],
                    });
                }
            }

            // sort arrays with the current sorting mode (and separate tasks by state putting done ones at the end)
            if (res.length > 0) {
                for (const category of res) {
                    const todoSortedTasks = category.tasks
                        .filter(task => task.state === TaskState.TODO)
                        .sort(
                            TASKS_COMPARERS[TaskState.TODO][sortingMode.mode](
                                sortingMode.order,
                            ),
                        );
                    const doneSortedTasks = category.tasks
                        .filter(task => task.state === TaskState.DONE)
                        .sort(
                            TASKS_COMPARERS[TaskState.DONE][sortingMode.mode](
                                sortingMode.order,
                            ),
                        );
                    category.tasks = todoSortedTasks.concat(doneSortedTasks);
                }
            }
        }
        // separate tasks by state (todo / done)
        else {
            // group tasks by state
            const groupedByState = groupBy(tasksList, 'state');

            // for each state
            for (const taskState in groupedByState) {
                // if associated category exists, push it in the res
                if (taskState in TASK_STATE_CATEGORIES) {
                    res.push({
                        ...TASK_STATE_CATEGORIES[taskState],
                        tasks: groupedByState[taskState],
                    });
                }
            }

            // sort arrays with the current sorting mode
            if (res.length > 0) {
                for (const category of res) {
                    category.tasks.sort(
                        TASKS_COMPARERS[
                            getTaskStateFromCategoryId(category.id)
                        ][sortingMode.mode](sortingMode.order),
                    );
                }
            }
        }

        return res;
    },
);
