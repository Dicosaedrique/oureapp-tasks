import { CategoryID } from 'model/Category';
import uniqid from 'uniqid';

import { DEFAULT_TASK_PRIORITY, TaskPriority } from './Priority';

/**
 * possible states of a task (todo, done)
 */
export enum TaskState {
    TODO = 1,
    DONE = 2,
}

export type TaskID = string;

/**
 * define the interface of a task
 */
export interface Task {
    readonly id: TaskID;
    title: string;
    creationDate: number;
    state: TaskState;
    priority: TaskPriority;

    limitDate?: number;
    finishedDate?: number;
    category?: CategoryID;
}

/**
 * parameters needed to create a task
 */
export interface TaskInputProps {
    title: string;
    priority?: TaskPriority;
    limitDate?: number;
    category?: string;
}

/**
 * build a task and returns it
 * @param inputs TaskInputProps object to create the task
 * @returns the created task
 */
export function createTask({
    title,
    priority = DEFAULT_TASK_PRIORITY,
    limitDate,
    category,
}: TaskInputProps): Task {
    return {
        id: uniqid(),
        creationDate: Date.now(),
        state: TaskState.TODO,
        title,
        priority,
        limitDate,
        category,
    };
}

/**
 * update the task state and manage the logic behind it
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
            task.finishedDate = Date.now();
            break;
    }

    return task;
}
