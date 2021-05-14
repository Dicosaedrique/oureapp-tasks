import uniqid from 'uniqid';

/**
 * possible states of a task (todo, done)
 */
export enum TaskState {
    TODO,
    DONE,
}

/**
 * define the interface of a task
 */
export interface Task {
    id: string;
    title: string;
    creationDate: number;
    state: TaskState;

    priority?: number;
    limitDate?: number;
    finishedDate?: number;
}

/**
 * parameters needed to create a task
 */
export interface TaskInputProps {
    title: string;
    priority?: number;
    limitDate?: number;
}

/**
 * build a task and returns it
 * @param inputs TaskInputProps object to create the task
 * @returns the created task
 */
export function createTask({
    title,
    priority,
    limitDate,
}: TaskInputProps): Task {
    return {
        id: uniqid(),
        title: title,
        creationDate: Date.now(),
        state: TaskState.TODO,
        priority: priority,
        limitDate: limitDate,
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
