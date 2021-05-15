import { createTask, Task, TaskState } from '..';
import { TaskPriority } from '../Priority';

let increment = 1;
const DAY_IN_MS = 86400000;

function createTestTask(opt: Partial<Task>): Task {
    return {
        ...createTask({ title: `Example ${increment++}` }),
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

export const TASK_DEMO: Task[] = [
    createTodoTaskWithLimitDateTest({ priority: TaskPriority.NONE }, 50),
    createTodoTaskWithLimitDateTest({ priority: TaskPriority.LOW }, 70),
    createTodoTaskWithLimitDateTest({ priority: TaskPriority.MEDIUM }, 90),
    createDoneTaskWithLimitDateTest({ priority: TaskPriority.MEDIUM }, -5),
    createDoneTaskWithLimitDateTest({ priority: TaskPriority.HIGH }, 5),
    createTestTask({ priority: TaskPriority.EXTREME }),
    createTestTask({
        priority: TaskPriority.HIGH,
        limitDate: Date.now() + DAY_IN_MS * 600,
    }),
];
