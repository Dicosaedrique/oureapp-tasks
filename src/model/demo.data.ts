/**
 * Contains sample data for demonstration of the app
 **/

import { createTask, Task, TaskState } from 'model/Task';
import { TaskPriority } from 'model/Task/Priority';
import TaskList, { createTaskList, DEFAULT_LIST, DEFAULT_LIST_ID } from 'model/TaskList';
import { Dictionary, ID } from 'utils/types';

// utils variables / constants
let taskIncrement = 1;
const DAY_IN_MS = 86400000;

const taskListTitle = { ...createTaskList('Test title sorting'), id: 'title' };
const taskListPriority = { ...createTaskList('Test priority sorting'), id: 'priority' };
const taskListLimitDate = { ...createTaskList('Test limit date sorting'), id: 'limit_date' };
const taskListCreationDate = {
    ...createTaskList('Test creation date sorting'),
    id: 'creation_date',
};
const taskListStress = { ...createTaskList('Test HUGE task count'), id: 'stress_test' };

/**
 * Generate tasks for each task list
 */

// test title sorting
taskListTitle.tasks[TaskState.TODO].push(
    createTestTask({ title: 'A task' }),
    createTestTask({ title: 'B task' }),
    createTestTask({ title: 'C task' }),
    createTestTask({ title: 'D task' }),
    createTestTask({ title: 'E task' }),
);

// test priority sorting
taskListPriority.tasks[TaskState.TODO].push(
    createTestTask({ priority: TaskPriority.NONE }),
    createTestTask({ priority: TaskPriority.LOW }),
    createTestTask({ priority: TaskPriority.MEDIUM }),
    createTestTask({ priority: TaskPriority.HIGH }),
    createTestTask({ priority: TaskPriority.EXTREME }),
);

// test limit date sorting
taskListLimitDate.tasks[TaskState.TODO].push(
    createTodoTaskWithLimitDateTest({}, 10),
    createTodoTaskWithLimitDateTest({}, 30),
    createTodoTaskWithLimitDateTest({}, 50),
    createTodoTaskWithLimitDateTest({}, 70),
    createTodoTaskWithLimitDateTest({}, 90),
);

// test creation date sorting
taskListCreationDate.tasks[TaskState.TODO].push(
    createTestTask({ creationDate: dateDays(-10) }),
    createTestTask({ creationDate: dateDays(-8) }),
    createTestTask({ creationDate: dateDays(-6) }),
    createTestTask({ creationDate: dateDays(-4) }),
    createTestTask({ creationDate: dateDays(-2) }),
);

// add default list tasks
DEFAULT_LIST.tasks[TaskState.TODO].push(
    // test limit date with different year
    createTestTask({
        title: 'Limit date next year',
        priority: TaskPriority.HIGH,
        limitDate: dateDays(365),
    }),
    // test past due limit date
    createTodoTaskWithLimitDateTest({ title: 'Past due limite date' }, 300),
);

// pseudo stress test
// taskListStress.tasks[TaskState.TODO].push(...generateTasks(100, {}));

/**
 * TaskLists used for the demo
 */
const TASK_LISTS_DEMO: Dictionary<ID, TaskList> = {
    [DEFAULT_LIST_ID]: DEFAULT_LIST,
    title: taskListTitle,
    priority: taskListPriority,
    limit_date: taskListLimitDate,
    creation_date: taskListCreationDate,
    stress_test: taskListStress,
};

export default TASK_LISTS_DEMO;

/////////////////////////////////////////////////////////
//                 UTILS FUNCTIONS                     //
/////////////////////////////////////////////////////////

function createTestTask(opt: Partial<Task>): Task {
    return {
        ...createTask({ title: `Task ${taskIncrement++}` }),
        ...opt,
    };
}

function createTodoTaskWithLimitDateTest(opt: Partial<Task>, percent: number): Task {
    return createTestTask({
        ...opt,
        creationDate: new Date(Date.now() - DAY_IN_MS * (percent / 10)),
        limitDate: new Date(Date.now() + DAY_IN_MS * ((100 - percent) / 10)),
    });
}

// function generateTasks(x: number, opt: Partial<Task>): Task[] {
//     const res: Task[] = [];
//     for (let i = 0; i < x; i++) res.push(createTestTask(opt));
//     return res;
// }

/**
 * @param days days to add or to substract to current date
 * @returns date from now -/+ days
 */
function dateDays(days: number): Date {
    return new Date(Date.now() + DAY_IN_MS * days);
}
