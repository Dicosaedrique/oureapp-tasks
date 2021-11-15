import IElementId, { generateId } from 'model/IElementId';

import { DEFAULT_TASK_PRIORITY, TaskPriority } from './Priority';

export interface Task extends IElementId {
    readonly creationDate: number;
    title: string;
    state: TaskState;
    priority: TaskPriority;

    limitDate?: number;
    finishedDate?: number;
}

export enum TaskState {
    TODO = 1,
    DONE = 2,
}

// todo replace in language json file
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
    limitDate?: number;
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
        creationDate: Date.now(),
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
export function setTaskState(task: Task, newState: TaskState): Task {
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
