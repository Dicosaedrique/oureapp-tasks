import { Task } from 'model/Task';

/* --- STATE --- */
export interface TasksSliceState {
    list: Array<Task>;
    archived: Array<Task>;
}
