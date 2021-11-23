import { TaskInputProps, TaskState } from 'model/Task';
import TaskList, { TaskListInputProps } from 'model/TaskList';
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

export type PayloadDeleteTask = PayloadTaskList;
export type PayloadArchiveTask = PayloadTaskList;

export interface PayloadUpdateTaskState extends PayloadTaskList {
    newTaskState: TaskState;
}

export interface PayloadCreateList {
    listProps: TaskListInputProps;
}

export interface PayloadEditList extends PayloadCreateList {
    id: Id;
}

export interface PayloadDeleteList {
    id: Id;
}

export type PayloadArchiveList = PayloadDeleteList;
