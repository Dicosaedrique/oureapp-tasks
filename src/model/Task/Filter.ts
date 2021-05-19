import { memoize } from 'lodash';
import { CategoryID } from 'model/Category';
import { Filter } from 'utils/types/types';

import { Task, TaskState } from '.';
import { TaskPriority } from './Priority';

/**
 * Defines settings to filter tasks (by state, priority, limit date and category).
 * Filters logic is based on array of values to exclude, if array is empty, all values
 * are accepted.
 */
export interface FilteringSettings {
    state: Array<TaskState>;
    priority: Array<TaskPriority>;
    limitDate: Array<boolean>; // true = exclude tasks with limit date, false = exclude tasks without limitdate
    category: Array<CategoryID | undefined>; // accepts undefined for tasks with no category
}

/**
 * Defines the keys that can be used in filters
 */
export type FilterableTaskKeys = keyof FilteringSettings;

////////////////////////////////////////////////////////////////
// DEFINES EVERY FILTER

/**
 * Memoized function that returns a filter that rejects every tasks with a state in the values
 * @param values states rejected in the filter
 * @returns the filter for task state
 */
function filterState(values: TaskState[]): Filter<Task> {
    return memoize(
        (task: Task) => values.length === 0 || !values.includes(task.state),
    );
}

/**
 * Memoized function that returns a filter that rejects every tasks with a priority in the values
 * @param values priorities rejected in the filter
 * @returns the filter for task priority
 */
function filterPriority(values: TaskPriority[]): Filter<Task> {
    return memoize(
        (task: Task) => values.length === 0 || !values.includes(task.priority),
    );
}

/**
 * Memoized function that returns a filter that rejects every tasks with or without a limit date
 * @param values array of boolean (only one value is usefull, true to reject tasks with limit date and false for the contrary)
 * @returns the filter for task limit date
 */
function filterLimitDate(values: boolean[]): Filter<Task> {
    return memoize((task: Task) => {
        if (values.length === 0) return true;

        const excludeTasksWithLimitDate = values.includes(true);
        const excludeTasksWithoutLimitDate = values.includes(false);
        const excludeAll =
            excludeTasksWithLimitDate && excludeTasksWithoutLimitDate;

        return (
            !excludeAll &&
            ((excludeTasksWithLimitDate && task.limitDate === undefined) ||
                (excludeTasksWithoutLimitDate && task.limitDate !== undefined))
        );
    });
}

/**
 * Memoized function that returns a filter that rejects every tasks with a category in the values
 * @param values categories rejected in the filter
 * @returns the filter for task category
 */
function filterCategory(values: (string | undefined)[]): Filter<Task> {
    return memoize(
        (task: Task) => values.length === 0 || !values.includes(task.category),
    );
}

/**
 * Object mapped to filtering settings that returns filters generator based on the filtering settings
 * filters are memoized and will need to be combined before filtering task list
 */
const FILTERS_GENERATORS: TasksFiltersGenerators = {
    state: filterState,
    priority: filterPriority,
    limitDate: filterLimitDate,
    category: filterCategory,
};

/**
 * Combine filters with passed settings and returns the combined filter
 */
export function getFilterFromSettings(
    settings: FilteringSettings,
): Filter<Task> {
    // todo : find a way to do that automatically in typescript without casting any
    return combineFilters(
        FILTERS_GENERATORS.state(settings.state),
        FILTERS_GENERATORS.priority(settings.priority),
        FILTERS_GENERATORS.limitDate(settings.limitDate),
        FILTERS_GENERATORS.category(settings.category),
    );
}

////////////////////////////////////////////////////////////////
// UTILS FUNCTIONS / TYPES

/**
 * Allow the combination of filters
 * @param filters list of filters to combine
 * @returns the combined filter
 */
function combineFilters<T>(...filters: Filter<T>[]): Filter<T> {
    return (target: T) => {
        for (const filter of filters) if (!filter(target)) return false;
        return true;
    };
}

/**
 * Defines a type that map filtering settings to filter generators function
 */
type TasksFiltersGenerators = {
    [Key in keyof FilteringSettings]: (
        values: FilteringSettings[Key],
    ) => Filter<Task>;
};
