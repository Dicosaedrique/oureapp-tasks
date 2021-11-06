import { TaskState } from 'model/Task';
import TaskList from 'model/TaskList';
import { Dictionary, Id } from 'utils/types';

export type TaskListsSliceState = Dictionary<Id, TaskList>;

export interface PayloadTaskList {
    taskListId: Id;
    taskId: Id;
}

export interface PayloadRemoveTask extends PayloadTaskList {}
export interface PayloadArchiveTask extends PayloadTaskList {}

export interface PayloadUpdateTaskState extends PayloadTaskList {
    newTaskState: TaskState;
}
