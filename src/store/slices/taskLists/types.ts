import { TaskState } from 'model/Task';
import TaskList from 'model/TaskList';
import { Dictionary, ID } from 'utils/types';

/* --- STATE --- */
export type TaskListsSliceState = Dictionary<ID, TaskList>;

export interface PayloadTask {
    taskListID: ID;
    taskID: ID;
    taskState: TaskState;
}

export interface PayloadRemoveTask extends PayloadTask {}
export interface PayloadArchiveTask extends PayloadTask {}

export interface PayloadUpdateTaskState extends PayloadTask {
    newTaskState: TaskState;
}
