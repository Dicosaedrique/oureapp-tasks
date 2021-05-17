/**
 * Contains sample data for demonstration of the app
 **/

import { Category, createCategory } from './Category';
import { createTask, Task } from './Task';
import { TaskPriority } from './Task/Priority';

// utils variables / constants
let taskIncrement = 1;
let categoryIncrement = 1;
const DAY_IN_MS = 86400000;

/**
 * Categories used for the demo
 */
export const CATEGORIES_DEMO: Record<string, Category> = {
    title: { id: 'title', title: 'Test title sorting' },
    priority: { id: 'priority', title: 'Test priority sorting' },
    limit_date: { id: 'limit_date', title: 'Test limit date sorting' },
    creation_date: { id: 'creation_date', title: 'Test creation date sorting' },
    stress_test: { id: 'stress_test', title: 'Test HUGE task count' },
};

/**
 * Tasks used for the demo
 */
export const TASKS_DEMO: Task[] = [
    // test title sorting
    createTestTask({ category: 'title', title: 'A task' }),
    createTestTask({ category: 'title', title: 'B task' }),
    createTestTask({ category: 'title', title: 'C task' }),
    createTestTask({ category: 'title', title: 'D task' }),
    createTestTask({ category: 'title', title: 'E task' }),

    // test priority sorting
    createTestTask({ category: 'priority', priority: TaskPriority.NONE }),
    createTestTask({ category: 'priority', priority: TaskPriority.LOW }),
    createTestTask({ category: 'priority', priority: TaskPriority.MEDIUM }),
    createTestTask({ category: 'priority', priority: TaskPriority.HIGH }),
    createTestTask({ category: 'priority', priority: TaskPriority.EXTREME }),

    // test limit date sorting
    createTodoTaskWithLimitDateTest({ category: 'limit_date' }, 10),
    createTodoTaskWithLimitDateTest({ category: 'limit_date' }, 30),
    createTodoTaskWithLimitDateTest({ category: 'limit_date' }, 50),
    createTodoTaskWithLimitDateTest({ category: 'limit_date' }, 70),
    createTodoTaskWithLimitDateTest({ category: 'limit_date' }, 90),

    // test creation date sorting
    createTestTask({ category: '103', creationDate: dateDays(-10) }),
    createTestTask({ category: '103', creationDate: dateDays(-8) }),
    createTestTask({ category: '103', creationDate: dateDays(-6) }),
    createTestTask({ category: '103', creationDate: dateDays(-4) }),
    createTestTask({ category: '103', creationDate: dateDays(-2) }),

    // test limit date with different year
    createTestTask({
        title: 'Limit date next year',
        priority: TaskPriority.HIGH,
        limitDate: dateDays(365),
    }),

    // test past due limit date
    createTodoTaskWithLimitDateTest({ title: 'Past due limite date' }, 300),

    // pseudo stress test
    // ...generateTasks(100, { category: 'stress_test' }),
];

/////////////////////////////////////////////////////////
//                 UTILS FUNCTIONS                     //
/////////////////////////////////////////////////////////

/*function createTestCategory(opt: Partial<Category>): Category {
    return {
        ...createCategory(`Category ${categoryIncrement++}`),
        ...opt,
    };
}*/

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

/*function generateTasks(x: number, opt: Partial<Task>): Task[] {
    const res: Task[] = [];
    for (let i = 0; i < x; i++) res.push(createTestTask(opt));
    return res;
}*/

/**
 * @param days days to add or to substract to current date
 * @returns now -/+ days
 */
function dateDays(days: number) {
    return Date.now() + DAY_IN_MS * days;
}
