import { TaskState } from 'model/Task';
import uniqid from 'uniqid';

/**
 * define the interface of a category
 */
export interface Category {
    id: string;
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

// TODO : IS IT TEMP OR A GOOD WAY TO DO THAT ???

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
