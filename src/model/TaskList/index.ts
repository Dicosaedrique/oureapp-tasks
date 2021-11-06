import IElementId, { generateId } from 'model/IElementId';
import { Task, TaskState } from 'model/Task';
import { EnumDictionnary } from 'utils/types';

export type TaskStateDictionnary<Type> = EnumDictionnary<TaskState, Type>;

export interface TaskListBase extends IElementId {
    title: string;
    readonly creationDate: number;
}

export default interface TaskList extends TaskListBase {
    tasks: Task[];
    archivedTasks: Task[];
}

export function createTaskList(title: string): TaskList {
    return {
        id: generateId(),
        creationDate: Date.now(),
        title,
        tasks: [],
        archivedTasks: [],
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
