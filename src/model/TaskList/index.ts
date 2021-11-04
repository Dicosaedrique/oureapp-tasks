import IElementID, { generateId } from 'model/IElementID';
import { Task, TaskState } from 'model/Task';
import { EnumDictionnary } from 'utils/types/types';
import { getDateNow } from 'utils/utils';

export type TaskStateDictionnary<Type> = EnumDictionnary<TaskState, Type>;

/**
 * Defines a task list
 */
export default interface TaskList extends IElementID {
    title: string;
    tasks: TaskStateDictionnary<Task[]>;
    // todo probably add archived tasks here
    readonly creationDate: Date;
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

/**
 * Default task list for tasks that don't have a custom list
 */
export const DEFAULT_LIST: TaskList = {
    ...createTaskList('My tasks'),
    id: 'DEFAULT_LIST',
};
