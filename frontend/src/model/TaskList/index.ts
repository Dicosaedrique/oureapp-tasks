import IElementId, { generateId } from 'model/IElementId';
import { Task, TaskState } from 'model/Task';
import { EnumDictionnary } from 'utils/types';

export type TaskStateDictionnary<Type> = EnumDictionnary<TaskState, Type>;

export default interface TaskList extends IElementId {
    title: string;
    readonly creationDate: number;
    tasks: Task[];
    archivedTasks: Task[];
    isArchived: boolean;
}

export interface TaskListStats extends IElementId {
    title: string;
    readonly creationDate: number;
    taskCount: number;
    archiveTaskCount: number;
    taskToDoCount: number;
    isArchived: boolean;
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
        isArchived: false,
    };
}

export const DEFAULT_LIST_ID = 'default';

/**
 * Default task list for tasks that don't have a custom list
 */
export const DEFAULT_LIST: TaskList = {
    ...createTaskList({ title: 'My tasks' }),
    id: DEFAULT_LIST_ID,
};

export function mapListToListStats(list: TaskList): TaskListStats {
    return {
        id: list.id,
        title: list.title,
        creationDate: list.creationDate,
        taskCount: list.tasks.length,
        archiveTaskCount: list.archivedTasks.length,
        taskToDoCount: list.tasks.filter(task => task.state === TaskState.TODO).length,
        isArchived: list.isArchived,
    };
}

export function listCreationDateComparer(a: TaskList, b: TaskList): number {
    if (a.creationDate < b.creationDate) return -1;
    if (a.creationDate > b.creationDate) return 1;
    return 0;
}
