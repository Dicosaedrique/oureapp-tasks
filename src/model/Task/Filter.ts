import { memoize } from 'lodash';
import { CategoryID } from 'model/Category';
import { Filter } from 'utils/types/types';

import { Task, TaskState } from '.';
import { TaskPriority } from './Priority';

/**
 * Defines settings to filter tasks (by state, priority, limit date and category).
 * Filters logic is based on array of accepted value, if none or
 * all are selected then the array is empty and filters is ignored.
 */
export interface FilteringSettings {
    state: Array<TaskState>;
    priority: Array<TaskPriority>;
    limitDate: Array<boolean>; // true = only with limit date, false = only without limit date
    category: Array<CategoryID>;
}

/**
 * Defines the keys that can be used in filters
 */
export type FilterableTaskKeys = keyof FilteringSettings;

////////////////////////////////////////////////////////////////
// DEFINES EVERY FILTER

/**
 * Memoized function that returns a filter that accepts every tasks with a state in the values
 * if the values are empty, accepts all tasks
 * @param values states accepted in the filter
 * @returns the filter for task state
 */
function filterState(values: TaskState[]): Filter<Task> {
    return memoize(
        (task: Task) => values.length === 0 || values.includes(task.state),
    );
}

/**
 * Memoized function that returns a filter that accepts every tasks with a priority in the values
 * if the values are empty, accepts all tasks
 * @param values priorities accepted in the filter
 * @returns the filter for task priority
 */
function filterPriority(values: TaskPriority[]): Filter<Task> {
    return memoize(
        (task: Task) => values.length === 0 || values.includes(task.priority),
    );
}

/**
 * Memoized function that returns a filter that accepts every tasks with or without
 * a limit date based on the first element of the values array (this is the only filter that does
 * that because it's a boolean so only one value is accepted). if the values are empty, accepts all tasks
 * @param values array of one boolean or empty
 * @returns the filter for task limit date
 */
function filterLimitDate([value]: boolean[]): Filter<Task> {
    return memoize((task: Task) => {
        if (value === true) return task.limitDate !== undefined;
        else if (value === false) return task.limitDate === undefined;
        return true;
    });
}

/**
 * Memoized function that returns a filter that accepts every tasks with a category in the values
 * if the values are empty, accepts all tasks
 * @param values categories accepted in the filter
 * @returns the filter for task category
 */
function filterCategory(values: string[]): Filter<Task> {
    return memoize(
        (task: Task) =>
            values.length === 0 ||
            (task.category !== undefined && values.includes(task.category)),
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
