import IElementID, { generateId } from 'model/IElementID';
import { Task, TaskState } from 'model/Task';
import { getDateNow } from 'utils';
import { EnumDictionnary } from 'utils/types';

export type TaskStateDictionnary<Type> = EnumDictionnary<TaskState, Type>;

export interface TaskListBase extends IElementID {
    title: string;
    readonly creationDate: Date;
}

/**
 * Defines a task list
 */
export default interface TaskList extends TaskListBase {
    tasks: TaskStateDictionnary<Task[]>;
    // todo probably add archived tasks here
}

/**
 * Creates a task list
 */
export function createTaskList(title: string): TaskList {
    return {
        id: generateId(),
        creationDate: getDateNow(),
        title,
        tasks: {
            [TaskState.TODO]: [],
            [TaskState.DONE]: [],
        },
    };
}

export const DEFAULT_LIST_ID = 'DEFAULT_LIST';

/**
 * Default task list for tasks that don't have a custom list
 */
export const DEFAULT_LIST: TaskList = {
    ...createTaskList('My tasks'),
    id: DEFAULT_LIST_ID,
};
