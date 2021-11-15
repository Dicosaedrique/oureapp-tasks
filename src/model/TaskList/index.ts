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

export interface TaskListInputProps {
    title: string;
}

export function createTaskList(props: TaskListInputProps): TaskList {
    return {
        id: generateId(),
        creationDate: Date.now(),
        title: props.title,
        tasks: [],
        archivedTasks: [],
    };
}

export const DEFAULT_LIST_ID = 'DEFAULT_LIST';

/**
 * Default task list for tasks that don't have a custom list
 */
export const DEFAULT_LIST: TaskList = {
    ...createTaskList({ title: 'My tasks' }),
    id: DEFAULT_LIST_ID,
};
