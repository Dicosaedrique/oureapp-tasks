import IElementID, { generateId } from 'model/IElementID';
import { getDateNow } from 'utils';

import { DEFAULT_TASK_PRIORITY, TaskPriority } from './Priority';

/**
 * Defines the interface of a task
 */
export interface Task extends IElementID {
    readonly creationDate: Date;
    title: string;
    state: TaskState;
    priority: TaskPriority;

    limitDate?: Date;
    finishedDate?: Date;
}

/**
 * possible states of a task
 */
export enum TaskState {
    TODO = 1,
    DONE = 2,
}

/**
 * Mapped names of the task states : todo replace in language json file
 */
export const TASK_STATE_NAMES = {
    [TaskState.TODO]: 'Todo',
    [TaskState.DONE]: 'Done',
};

/**
 * Parameters needed to create a task
 */
export interface TaskInputProps {
    title: string;
    priority?: TaskPriority;
    limitDate?: Date;
}

/**
 * Creates a task and returns it
 * @param inputs TaskInputProps object to create the task
 * @returns the created task
 */
export function createTask({
    title,
    priority = DEFAULT_TASK_PRIORITY,
    limitDate,
}: TaskInputProps): Task {
    return {
        id: generateId(),
        creationDate: getDateNow(),
        state: TaskState.TODO,
        title,
        priority,
        limitDate,
    };
}

/**
 * Updates the task state and manages the logic behind it
 * @param task the task to update
 * @param newState the new state of the task
 * @returns the updated task
 */
export function setTaskState(task: Task, newState: TaskState) {
    if (task.state === newState) return task; // no change

    task.state = newState;

    switch (task.state) {
        case TaskState.TODO:
            delete task.finishedDate;
            break;

        case TaskState.DONE:
            task.finishedDate = getDateNow();
            break;
    }

    return task;
}
