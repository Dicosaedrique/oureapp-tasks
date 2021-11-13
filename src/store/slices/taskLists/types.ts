import { TaskInputProps, TaskState } from 'model/Task';
import TaskList from 'model/TaskList';
import { Dictionary, Id } from 'utils/types';

export type TaskListsSliceState = Dictionary<Id, TaskList>;

export interface PayloadTaskList {
    taskListId: Id;
    taskId: Id;
}

export interface PayloadCreateTask {
    taskListId: Id;
    taskProps: TaskInputProps;
}
export type PayloadRemoveTask = PayloadTaskList;
export type PayloadArchiveTask = PayloadTaskList;

export interface PayloadUpdateTaskState extends PayloadTaskList {
    newTaskState: TaskState;
}
