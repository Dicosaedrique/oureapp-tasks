/**
 * Contains sample data for demonstration of the app
 **/

import { createTask, Task } from 'model/Task';
import { TaskPriority } from 'model/Task/Priority';
import TaskList, { createTaskList, DEFAULT_LIST, DEFAULT_LIST_ID } from 'model/TaskList';
import { Dictionary, Id } from 'utils/types';

// utils variables / constants
let taskIncrement = 1;
const DAY_IN_MS = 86400000;

const taskListTitle: TaskList = { ...createTaskList({ title: 'Test title sorting' }), id: 'title' };
const taskListPriority: TaskList = {
    ...createTaskList({ title: 'Test priority sorting' }),
    id: 'priority',
};
const taskListLimitDate: TaskList = {
    ...createTaskList({ title: 'Test limit date sorting' }),
    id: 'limit_date',
};
const taskListCreationDate: TaskList = {
    ...createTaskList({ title: 'Test creation date sorting' }),
    id: 'creation_date',
};

const taskListArchived: TaskList = {
    ...createTaskList({ title: 'Test archived list' }),
    id: 'archived_list',
    isArchived: true,
};

// const taskListStress: TaskList = { ...createTaskList('Test HUGE task count'), id: 'stress_test' };

/**
 * Generate tasks for each task list
 */

// test title sorting
taskListTitle.tasks.push(
    createTestTask({ title: 'A task' }),
    createTestTask({ title: 'B task' }),
    createTestTask({ title: 'C task' }),
    createTestTask({ title: 'D task' }),
    createTestTask({ title: 'E task' }),
);

// test priority sorting
taskListPriority.tasks.push(
    createTestTask({ priority: TaskPriority.NONE }),
    createTestTask({ priority: TaskPriority.NONE }),
    createTestTask({ priority: TaskPriority.LOW }),
    createTestTask({ priority: TaskPriority.LOW }),
    createTestTask({ priority: TaskPriority.MEDIUM }),
    createTestTask({ priority: TaskPriority.MEDIUM }),
    createTestTask({ priority: TaskPriority.HIGH }),
    createTestTask({ priority: TaskPriority.HIGH }),
    createTestTask({ priority: TaskPriority.HIGH }),
);

// test limit date sorting
taskListLimitDate.tasks.push(
    createTodoTaskWithLimitDateTest({}, 10),
    createTodoTaskWithLimitDateTest({}, 30),
    createTodoTaskWithLimitDateTest({}, 50),
    createTodoTaskWithLimitDateTest({}, 70),
    createTodoTaskWithLimitDateTest({}, 90),
    createTodoTaskWithLimitDateTest({}, 90),
    createTestTask({ limitDate: dateDays(-5) }),
);
taskListLimitDate.archivedTasks.push(createTodoTaskWithLimitDateTest({}, 10));

// test creation date sorting
taskListCreationDate.tasks.push(
    createTestTask({ creationDate: dateDays(-10) }),
    createTestTask({ creationDate: dateDays(-8) }),
    createTestTask({ creationDate: dateDays(-6) }),
    createTestTask({ creationDate: dateDays(-4) }),
    createTestTask({ creationDate: dateDays(-2) }),
);

// test archived list
taskListArchived.archivedTasks.push(createTestTask({ creationDate: dateDays(-10) }));

// add default list tasks
DEFAULT_LIST.tasks.push(
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
// taskListStress.tasks.push(...generateTasks(100, {}));

/**
 * TaskLists used for the demo
 */
const TASK_LISTS_DEMO: Dictionary<Id, TaskList> = {
    [DEFAULT_LIST_ID]: DEFAULT_LIST,
    [taskListTitle.id]: taskListTitle,
    [taskListPriority.id]: taskListPriority,
    [taskListLimitDate.id]: taskListLimitDate,
    [taskListCreationDate.id]: taskListCreationDate,
    [taskListArchived.id]: taskListArchived,
    // stress_test: taskListStress,
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
        creationDate: Date.now() - DAY_IN_MS * (percent / 10),
        limitDate: Date.now() + DAY_IN_MS * ((100 - percent) / 10),
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
function dateDays(days: number): number {
    return Date.now() + DAY_IN_MS * days;
}
