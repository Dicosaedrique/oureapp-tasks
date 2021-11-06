import { TaskState } from 'model/Task';
import TaskList from 'model/TaskList';
import { Dictionary, ID } from 'utils/types';

/* --- STATE --- */
export type TaskListsSliceState = Dictionary<ID, TaskList>;

export interface PayloadTaskList {
    taskListID: ID;
    taskID: ID;
}

export interface PayloadRemoveTask extends PayloadTaskList {}
export interface PayloadArchiveTask extends PayloadTaskList {}

export interface PayloadUpdateTaskState extends PayloadTaskList {
    newTaskState: TaskState;
}
