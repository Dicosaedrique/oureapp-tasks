import { Task, TaskState } from 'model/Task';
import { ASCENDING, DESENDING } from 'utils/constants';
import { Comparer, SortingOrder } from 'utils/types';

/**
 * Tasks properties that can be sorted in the app
 */
export type SortableTaskKeys = keyof Omit<Task, 'id' | 'state'>;

/**
 * Tasks properties that the user can sort (exclude finishedDate cause done tasks are sorted automatically)
 */
export type TaskSortMode = Exclude<SortableTaskKeys, 'finishedDate'>;

// todo : export in language config
export const SORT_MODE_NAMES: Record<TaskSortMode, string> = {
    title: 'By title',
    creationDate: 'By creation date',
    priority: 'By priority',
    limitDate: 'By limit date',
};

/**
 * Defines the order of priority when sorting tasks keys meaning when sorting
 * by a key, in case of equality, it will break down to the next one
 *
 * Absolute order is : priority > limit_date > creation_date > title
 */
const TASK_COMPARISON_PRIORITY: Record<SortableTaskKeys, TaskComparerGenerator[]> = {
    title: [compareByTitle],
    creationDate: [compareByCreationDate],
    priority: [compareByPriority, compareByLimitDate, compareByCreationDate],
    limitDate: [compareByLimitDate, compareByPriority, compareByCreationDate],
    finishedDate: [compareByFinishDate],
};

/**
 * Defines the comparers generator for every state and every mode (based on key priority)
 */
export const TASKS_COMPARERS_ASC: TaskComparers = generateTasksComparersWithSortingOrder(ASCENDING);
export const TASKS_COMPARERS_DES: TaskComparers = generateTasksComparersWithSortingOrder(DESENDING);

export type TaskComparers = Record<TaskState, Record<TaskSortMode, Comparer<Task>>>;
export type TaskStateComparers = Record<TaskState, Comparer<Task>>;

/**
 * Desfines tasks comparers for each task state based on task key priority comparison
 * for a given sorting order
 */
function generateTasksComparersWithSortingOrder(order: SortingOrder): TaskComparers {
    return {
        [TaskState.TODO]: {
            title: combineTaskComparer(
                ...TASK_COMPARISON_PRIORITY.title.map(comparerGenerator =>
                    comparerGenerator(order),
                ),
            ),
            creationDate: combineTaskComparer(
                ...TASK_COMPARISON_PRIORITY.creationDate.map(comparerGenerator =>
                    comparerGenerator(order),
                ),
            ),
            priority: combineTaskComparer(
                ...TASK_COMPARISON_PRIORITY.priority.map(comparerGenerator =>
                    comparerGenerator(order),
                ),
            ),
            limitDate: combineTaskComparer(
                ...TASK_COMPARISON_PRIORITY.limitDate.map(comparerGenerator =>
                    comparerGenerator(order),
                ),
            ),
        },
        // done tasks are sorted by finish date exclusively
        [TaskState.DONE]: {
            title: combineTaskComparer(
                ...TASK_COMPARISON_PRIORITY.finishedDate.map(comparerGenerator =>
                    comparerGenerator(order),
                ),
            ),
            creationDate: combineTaskComparer(
                ...TASK_COMPARISON_PRIORITY.finishedDate.map(comparerGenerator =>
                    comparerGenerator(order),
                ),
            ),
            priority: combineTaskComparer(
                ...TASK_COMPARISON_PRIORITY.finishedDate.map(comparerGenerator =>
                    comparerGenerator(order),
                ),
            ),
            limitDate: combineTaskComparer(
                ...TASK_COMPARISON_PRIORITY.finishedDate.map(comparerGenerator =>
                    comparerGenerator(order),
                ),
            ),
        },
    };
}

function combineTaskComparer(...comparers: TaskComparer[]): TaskComparer {
    return (a: Task, b: Task): number => {
        let value = 0;

        for (const comparer of comparers) {
            value = comparer(a, b);
            if (value !== 0) break; // if the two elements aren't equal with this comparer, we stop here
        }

        return value;
    };
}

////////////////////////////////////////////////////////////////
// DEFINES EVERY COMPARISON FUNCTIONS

type TaskComparer = (a: Task, b: Task) => number;
type TaskComparerGenerator = (order: SortingOrder) => TaskComparer;

/***
 * Returns a comparison function for task priority
 */
function compareByTitle(order: SortingOrder): TaskComparer {
    return (a: Task, b: Task): number => {
        if (a.title < b.title) return order ? -1 : 1;
        if (a.title > b.title) return order ? 1 : -1;
        return 0;
    };
}

/***
 * Returns a comparison function for task priority
 */
function compareByPriority(order: SortingOrder): TaskComparer {
    return (a: Task, b: Task): number => {
        const value = a.priority - b.priority;
        return order ? value : -value;
    };
}

/***
 * Returns a comparison function for task creation date
 */
function compareByCreationDate(order: SortingOrder): TaskComparer {
    return (a: Task, b: Task): number => {
        if (a.creationDate < b.creationDate) return order ? -1 : 1;
        if (a.creationDate > b.creationDate) return order ? 1 : -1;
        return 0;
    };
}

/***
 * Returns a comparison function for task limit date
 */
function compareByLimitDate(order: SortingOrder): TaskComparer {
    return (a: Task, b: Task): number => {
        if (a.limitDate === b.limitDate) return 0;
        else if (a.limitDate === undefined && b.limitDate !== undefined) return order ? -1 : 1;
        else if (a.limitDate !== undefined && b.limitDate === undefined) return order ? 1 : -1;
        else if (a.limitDate! < b.limitDate!) return order ? -1 : 1;
        else if (a.limitDate! > b.limitDate!) return order ? 1 : -1;
        return 0; // not reacheable
    };
}

/***
 * Returns a comparison function for task finish date, ignores the given order
 */
function compareByFinishDate(order: SortingOrder): TaskComparer {
    return (a: Task, b: Task): number => {
        if (a.finishedDate === b.finishedDate) return 0;
        else if (a.finishedDate === undefined && b.finishedDate !== undefined) return -1;
        else if (a.finishedDate !== undefined && b.finishedDate === undefined) return 1;
        else if (a.finishedDate! < b.finishedDate!) return -1;
        else if (a.finishedDate! > b.finishedDate!) return 1;
        return 0; // not reacheable
    };
}
