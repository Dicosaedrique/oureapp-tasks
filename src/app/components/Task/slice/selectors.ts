import { selectCategories } from 'app/components/Category/slice/selectors';
import { selectFiltering } from 'app/components/Menus/Filtering/slice/selectors';
import { selectSorting } from 'app/components/Menus/Sorting/slice/selectors';
import { selectCategoriesPreferences } from 'app/pages/HomePage/preferencesSlice/selectors';
import { groupBy } from 'lodash';
import {
    DEFAULT_CATEGORY,
    getTaskStateFromCategoryId,
    TASK_STATE_CATEGORIES,
} from 'model/Category';
import { TaskState } from 'model/Task';
import { getFilterFromSettings } from 'model/Task/Filter';
import { TASKS_COMPARERS } from 'model/Task/Sort';
import { createSelector } from 'reselect';
import { RootState } from 'types';

import { CategoryContainerProps } from '../../Category';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.tasks || initialState;

/**
 * selector for tasks
 * @returns the "tasks" slice of global state
 */
export const selectTasks = selectSlice;

/**
 * @returns the task list (not archived)
 */
export const selectTasksList = createSelector(
    selectTasks,
    tasksState => tasksState.list,
);

/**
 * @returns the archived task list
 */
export const selectArchivedTasks = createSelector(
    selectTasks,
    tasksState => tasksState.archived,
);

/**
 * TODO : THIS PROBABLY NEEDS OTPIMIZATION AS IT TAKES TOO MANY PARAMETERS AND UPDATE TOO OFTEN THE WHOLE APP !!!
 *
 * @returns an array of "CategoryContainer" props
 */
export const selectSmartSeparatedTasks = createSelector(
    selectCategories,
    selectTasksList,
    selectCategoriesPreferences,
    selectSorting,
    selectFiltering,
    (categories, tasksList, categoriesPreferences, sortingMode, filtering) => {
        const res: CategoryContainerProps[] = [];

        //////////////////////////////////////////////////////////
        // 1 - FILTERS TASKS WITH THE FILTERING PREFERENCES

        const finalFilter = getFilterFromSettings(filtering);
        const tasks = tasksList.filter(finalFilter);

        //////////////////////////////////////////////////////////
        // 2 - SEPARATE THE TASKS (BY CATEGORY OR BY STATE)

        // separate tasks by categories
        if (categoriesPreferences.enableCategoriesSeparation) {
            const groupedByCategories = groupBy(tasks, 'category');

            // for each category
            for (const id in groupedByCategories) {
                const category = categories[id];

                // if associated category exists, push it in the res
                if (category !== undefined) {
                    res.push({
                        ...category,
                        tasks: groupedByCategories[id],
                    });
                }
                // manage tasks without categories (lodash.groupby transform undefined values in string)
                else if (id === 'undefined') {
                    res.push({
                        ...DEFAULT_CATEGORY,
                        tasks: groupedByCategories[id],
                    });
                }
            }

            // 3 - SORT THE TASKS WITH THE SORTING PREFERENCES

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
            const groupedByState = groupBy(tasks, 'state');

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

            // 3 - SORT THE TASKS WITH THE SORTING PREFERENCES

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
