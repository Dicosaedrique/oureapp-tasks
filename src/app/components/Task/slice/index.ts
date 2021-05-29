import { PayloadAction } from '@reduxjs/toolkit';
import { TASKS_DEMO } from 'model/demo.data';
import {
    createTask,
    setTaskState,
    TaskID,
    TaskInputProps,
    TaskState,
} from 'model/Task';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';

import { TasksSliceState } from './types';

// initial state of tasks (define a set of tasks and archived tasks)
export const initialState: TasksSliceState = {
    list: TASKS_DEMO,
    archived: [],
};

// create a redux slice for tasks
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        /**
         * add a task to the state (based in the tasks inputs)
         */
        addTask(state, action: PayloadAction<TaskInputProps>) {
            state.list.push(createTask(action.payload));
        },

        /**
         * remove a task from the slice (based in the task id)
         */
        removeTask(state, action: PayloadAction<TaskID>) {
            const taskIndex = state.list.findIndex(
                task => task.id === action.payload,
            );
            if (taskIndex !== -1) state.list.splice(taskIndex, 1);
        },

        /**
         * set the task state based on the payload
         */
        setTaskState(
            state,
            action: PayloadAction<{ id: TaskID; taskState: TaskState }>,
        ) {
            const taskIndex = state.list.findIndex(
                task => task.id === action.payload.id,
            );
            if (taskIndex !== -1)
                state.list[taskIndex] = setTaskState(
                    state.list[taskIndex],
                    action.payload.taskState,
                );
        },
    },
});

export const { actions: tasksActions } = slice;

// create the slice hook for component
export const useTasksSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
