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
export type PayloadDeleteArchivedTask = PayloadTaskList;
export type PayloadArchiveTask = PayloadTaskList;
export type PayloadUnarchiveTask = PayloadTaskList;

export interface PayloadUpdateTaskState extends PayloadTaskList {
    newTaskState: TaskState;
}

export interface PayloadCreateList {
    listProps: TaskListInputProps;
}

export interface PayloadEditList extends PayloadCreateList {
    id: Id;
}

interface PayloadListId {
    id: Id;
}

export type PayloadDeleteList = PayloadListId;
export type PayloadArchiveList = PayloadListId;
export type PayloadUnarchiveList = PayloadListId;
export type PayloadArchiveListDoneTasks = PayloadListId;
