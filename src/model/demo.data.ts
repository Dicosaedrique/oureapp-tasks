/**
 * Contains sample data for demonstration of the app
 **/

import { Category, createCategory } from './Category';
import { createTask, Task, TaskState } from './Task';
import { TaskPriority } from './Task/Priority';

let taskIncrement = 1;
let categoryIncrement = 1;
const DAY_IN_MS = 86400000;

function createTestCategory(opt: Partial<Category>): Category {
    return {
        ...createCategory(`Category ${categoryIncrement++}`),
        ...opt,
    };
}

function createTestTask(opt: Partial<Task>): Task {
    return {
        ...createTask({ title: `Task ${taskIncrement++}` }),
        ...opt,
    };
}

function createTodoTaskWithLimitDateTest(
    opt: Partial<Task>,
    percent: number,
): Task {
    return createTestTask({
        ...opt,
        creationDate: Date.now() - DAY_IN_MS * (percent / 10),
        limitDate: Date.now() + DAY_IN_MS * ((100 - percent) / 10),
    });
}

function createDoneTaskWithLimitDateTest(
    opt: Partial<Task>,
    daysLate: number,
): Task {
    return createTestTask({
        ...opt,
        creationDate: Date.now() - DAY_IN_MS * (Math.abs(daysLate) + 1),
        limitDate: Date.now() + DAY_IN_MS * daysLate,
        state: TaskState.DONE,
        finishedDate: Date.now(),
    });
}

export const CATEGORIES_DEMO: Record<string, Category> = {
    '0': createTestCategory({ id: '0' }),
    '1': createTestCategory({ id: '1' }),
    '2': createTestCategory({ id: '2' }),
    '3': createTestCategory({ id: '3' }),
};

export const TASKS_DEMO: Task[] = [
    createTodoTaskWithLimitDateTest(
        { priority: TaskPriority.NONE, category: '0' },
        50,
    ),
    createTodoTaskWithLimitDateTest(
        { priority: TaskPriority.LOW, category: '0' },
        70,
    ),
    createTodoTaskWithLimitDateTest(
        { priority: TaskPriority.MEDIUM, category: '1' },
        90,
    ),
    createDoneTaskWithLimitDateTest(
        { priority: TaskPriority.MEDIUM, category: '1' },
        -5,
    ),
    createDoneTaskWithLimitDateTest(
        { priority: TaskPriority.HIGH, category: '2' },
        5,
    ),
    createTestTask({ priority: TaskPriority.EXTREME }),
    createTestTask({
        priority: TaskPriority.HIGH,
        limitDate: Date.now() + DAY_IN_MS * 600,
    }),
];
