import { groupBy } from 'lodash';
import { DEFAULT_CATEGORY, TASK_STATE_CATEGORIES } from 'model/Category';
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
 * Selector that will separate tasks by state or by category based on category preferences
 * @returns an array of "CategoryContainer" props
 */
export const selectSmartSeparatedTasks = createSelector(
    selectCategories,
    selectTasksList,
    selectCategoriesPreferences,
    (categories, tasksList, categoriesPreferences) => {
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
        }

        return res;
    },
);
