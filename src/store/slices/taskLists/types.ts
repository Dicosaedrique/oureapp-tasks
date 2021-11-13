import { TaskInputProps, TaskState } from 'model/Task';
import TaskList from 'model/TaskList';
import { Dictionary, Id } from 'utils/types';

export type TaskListsSliceState = Dictionary<Id, TaskList>;

export interface PayloadTaskList {
    listId: Id;
    taskId: Id;
}

export interface PayloadCreateTask {
    listId: Id;
    taskProps: TaskInputProps;
}

export interface PayloadEditTask extends PayloadTaskList {
    taskProps: TaskInputProps;
}

export type PayloadRemoveTask = PayloadTaskList;
export type PayloadArchiveTask = PayloadTaskList;

export interface PayloadUpdateTaskState extends PayloadTaskList {
    newTaskState: TaskState;
}
