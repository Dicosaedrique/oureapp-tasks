import { memoize } from 'lodash';
import { ComparerOrder, SortingOrder } from 'utils/types/types';

import { Task, TaskState } from '.';

/**
 * Tasks properties that can be sorted in the app
 */
export type SortableTaskKeys = keyof Omit<Task, 'id' | 'category' | 'state'>;

/**
 * Tasks properties that the user can sort (exclude state because the app does it automatically)
 */
export type TaskSortMode = Exclude<SortableTaskKeys, 'finishedDate'>;

/**
 * Defines the order of priority when sorting tasks keys
 * ie. when sorting by a key, in case of equality, it will break down to the next one
 *
 * Absolute order is : priority > limit_date > creation_date > title
 */
const TASK_KEY_SORTING_ORDER: Record<
    SortableTaskKeys,
    Partial<SortableTaskKeys>[]
> = {
    title: ['title', 'priority', 'limitDate', 'creationDate'],
    creationDate: ['creationDate', 'priority', 'limitDate', 'title'],
    priority: ['priority', 'limitDate', 'creationDate', 'title'],
    limitDate: ['limitDate', 'priority', 'creationDate', 'title'],
    finishedDate: [
        'finishedDate',
        'priority',
        'limitDate',
        'creationDate',
        'title',
    ],
};

/**
 * Defines the comparer generator for every state and every mode (based on key priority)
 * done tasks are only primary compared with their finished date
 */
export const TASKS_COMPARERS: Record<
    TaskState,
    Record<TaskSortMode, ComparerOrder<Task>>
> = {
    [TaskState.TODO]: {
        title: createTaskComparerOrder(...TASK_KEY_SORTING_ORDER.title),
        creationDate: createTaskComparerOrder(
            ...TASK_KEY_SORTING_ORDER.creationDate,
        ),
        priority: createTaskComparerOrder(...TASK_KEY_SORTING_ORDER.priority),
        limitDate: createTaskComparerOrder(...TASK_KEY_SORTING_ORDER.limitDate),
    },
    [TaskState.DONE]: {
        title: createTaskComparerOrder(...TASK_KEY_SORTING_ORDER.finishedDate),
        creationDate: createTaskComparerOrder(
            ...TASK_KEY_SORTING_ORDER.finishedDate,
        ),
        priority: createTaskComparerOrder(
            ...TASK_KEY_SORTING_ORDER.finishedDate,
        ),
        limitDate: createTaskComparerOrder(
            ...TASK_KEY_SORTING_ORDER.finishedDate,
        ),
    },
};

///////////////////////////////////////////////////////////////////
//   UTILS FUNCTIONS USEFULL TO CREATE AND COMBINE COMPARERS     //
///////////////////////////////////////////////////////////////////

/**
 * Generate a "ComparerOrder" for one or more keys in a task, the priority is defined by the order of the keys (TODO : find a better name)
 * @param keys the keys to compare (in order of importance)
 * @returns the ComparerOrder function
 */
function createTaskComparerOrder(
    ...keys: SortableTaskKeys[]
): ComparerOrder<Task> {
    return memoize(
        (order: SortingOrder) =>
            function (a: Task, b: Task): number {
                let value: number = 0;

                // for each key to compare
                for (const key of keys) {
                    value = compare(
                        getValue(a[key], order),
                        getValue(b[key], order),
                    );
                    if (!order) value = -value;
                    if (value !== 0) break; // if the two elements aren't equal with this comparer, we stop here
                }

                return value;
            },
    );

    /**
     * Get the final value for comparison : if value is a string return charcode, if it is undefined
     * returns MAX_SAFE_INT or MIN_SAFE_INT based on if the order of the sort
     */
    function getValue(
        value: Task[SortableTaskKeys],
        order: SortingOrder,
    ): string | number {
        return (
            value || (order ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER)
        );
    }

    function compare(a: string | number, b: string | number): number {
        if (a > b) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    }
}
