import { TaskState } from 'model/Task';
import uniqid from 'uniqid';

export type CategoryID = string;

/**
 * define the interface of a category
 */
export interface Category {
    readonly id: CategoryID;
    title: string;
}

/**
 * build a category and returns it
 * @param title title of the category
 * @returns the created category
 */
export function createCategory(title: string): Category {
    return {
        id: uniqid(),
        title: title,
    };
}

/**
 * Default category for tasks that don't have a category
 */
export const DEFAULT_CATEGORY: Category = {
    ...createCategory('No category'),
    id: 'category_default',
};

/**
 * Categories mapped on task state (in case we don't separate tasks by categories but by state)
 */
export const TASK_STATE_CATEGORIES: Record<TaskState, Category> = {
    [TaskState.TODO]: {
        ...createCategory('Todo'),
        id: 'category_todo',
    },
    [TaskState.DONE]: {
        ...createCategory('Done'),
        id: 'category_done',
    },
};

/**
 * Util function to transform TASK_STATE_CATEGORIES ids in their associated task state
 * @param id the id of the category
 * @returns task state associated with this category id (or TaskState.TODO by default)
 */
export function getTaskStateFromCategoryId(id: string): TaskState {
    switch (id) {
        case TASK_STATE_CATEGORIES[TaskState.DONE].id:
            return TaskState.DONE;

        case TASK_STATE_CATEGORIES[TaskState.TODO].id:
        default:
            return TaskState.TODO;
    }
}
