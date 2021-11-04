import { memoize } from 'lodash';
import { Filter } from 'utils/types/types';

import { Task, TaskState } from '.';
import { TaskPriority } from './Priority';

/**
 * Defines settings to filter tasks (by state, priority, limit date and category).
 * Filters logic is based on array of values to exclude, if array is empty, all values are accepted.
 */
export interface FilteringSettings {
    state: Array<TaskState>;
    priority: Array<TaskPriority>;
    limitDate: Array<boolean>; // true = exclude tasks with limit date, false = exclude tasks without limitdate
}

/**
 * Combine filters with passed settings and returns the combined filter
 */
export function getFilterFromSettings(settings: FilteringSettings): Filter<Task> {
    const filters: Filter<Task>[] = [];

    if (settings.state.length > 0) filters.push(filterState(settings.state));
    if (settings.priority.length > 0) filters.push(filterPriority(settings.priority));
    if (settings.limitDate.length > 0) filters.push(filterLimitDate(settings.limitDate));

    return combineFilters(...filters);
}

/**
 * Allow the combination of filters
 * @param filters list of filters to combine
 * @returns the combined filter
 */
function combineFilters<T>(...filters: Filter<T>[]): Filter<T> {
    return (target: T) => filters.every(filter => filter(target));
}

////////////////////////////////////////////////////////////////
// DEFINES EVERY FILTER

/**
 * Memoized function that returns a filter that rejects every tasks with a state in the values
 * @param values states rejected in the filter
 * @returns the filter for task state
 */
function filterState(values: TaskState[]): Filter<Task> {
    return memoize((task: Task) => !values.includes(task.state));
}

/**
 * Memoized function that returns a filter that rejects every tasks with a priority in the values
 * @param values priorities rejected in the filter
 * @returns the filter for task priority
 */
function filterPriority(values: TaskPriority[]): Filter<Task> {
    return memoize((task: Task) => !values.includes(task.priority));
}

/**
 * Memoized function that returns a filter that rejects every tasks with or without a limit date
 * @param values array of boolean (only one value is usefull, true to reject tasks with limit date and false for the contrary)
 * @returns the filter for task limit date
 */
function filterLimitDate(values: boolean[]): Filter<Task> {
    return memoize((task: Task) => {
        const excludeTasksWithLimitDate = values.includes(true);
        const excludeTasksWithoutLimitDate = values.includes(false);
        const excludeAll = excludeTasksWithLimitDate && excludeTasksWithoutLimitDate;

        return (
            !excludeAll &&
            ((excludeTasksWithLimitDate && task.limitDate === undefined) ||
                (excludeTasksWithoutLimitDate && task.limitDate !== undefined))
        );
    });
}
