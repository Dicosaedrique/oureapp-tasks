import { PayloadAction } from '@reduxjs/toolkit';
import TASK_LISTS_DEMO from 'model/demo.data';
import { setTaskState } from 'model/Task';
import {
    PayloadArchiveTask,
    PayloadRemoveTask,
    PayloadUpdateTaskState,
    TaskListsSliceState,
} from 'store/slices/taskLists/types';
import { useInjectReducer } from 'utils/redux-injectors';
import { createSlice } from 'utils/redux-toolkit';

export const initialState: TaskListsSliceState = TASK_LISTS_DEMO;

const slice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {
        // /**
        //  * add a task to the state (based in the tasks inputs)
        //  */
        // addTask(state, action: PayloadAction<TaskInputProps>) {
        //     state.list.push(createTask(action.payload));
        // },
        removeTask(state, { payload }: PayloadAction<PayloadRemoveTask>) {
            const taskList = state[payload.taskListID];

            if (taskList !== undefined) {
                const taskIndex = taskList.tasks.findIndex(task => task.id === payload.taskID);
                if (taskIndex !== -1) taskList.tasks.splice(taskIndex, 1);
            }
        },
        // /**
        //  * edit task (based in the tasks inputs and id)
        //  */
        // editTask(state, action: PayloadAction<{ id: string; props: TaskInputProps }>) {
        //     const { id, props } = action.payload;
        //     const index = state.list.findIndex(task => task.id === id);
        //     if (index !== -1) {
        //         const updatedTask = { ...state.list[index], ...props };
        //         state.list[index] = updatedTask;
        //     }
        // },
        setTaskState(state, { payload }: PayloadAction<PayloadUpdateTaskState>) {
            const taskList = state[payload.taskListID];

            if (taskList !== undefined) {
                const taskIndex = taskList.tasks.findIndex(task => task.id === payload.taskID);
                if (taskIndex !== -1) {
                    taskList.tasks[taskIndex] = setTaskState(
                        taskList.tasks[taskIndex],
                        payload.newTaskState,
                    );
                }
            }
        },
        archiveTask(state, { payload }: PayloadAction<PayloadArchiveTask>) {
            const taskList = state[payload.taskListID];

            if (taskList !== undefined) {
                const taskIndex = taskList.tasks.findIndex(task => task.id === payload.taskID);
                if (taskIndex !== -1) {
                    const [taskToArchive] = taskList.tasks.splice(taskIndex, 1);
                    taskList.archivedTasks.push(taskToArchive);
                }
            }
        },
    },
});

// create the slice hook for component
export const useTaskListsSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
