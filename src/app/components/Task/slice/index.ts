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
         * edit task (based in the tasks inputs and id)
         */
        editTask(
            state,
            action: PayloadAction<{ id: string; props: TaskInputProps }>,
        ) {
            const { id, props } = action.payload;

            const index = state.list.findIndex(task => task.id === id);

            if (index !== -1) {
                const updatedTask = { ...state.list[index], ...props };

                state.list[index] = updatedTask;
            }
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

        /**
         * archive the given task (by id) if present in task list and not in archive
         */
        archiveTask(state, action: PayloadAction<TaskID>) {
            const indexList = state.list.findIndex(
                task => task.id === action.payload,
            );

            const indexArchive = state.archived.findIndex(
                task => task.id === action.payload,
            );

            // if the task exists in the task list and don't in the archive
            if (indexList !== -1 && indexArchive === -1) {
                const task = state.list.splice(indexList, 1);
                state.archived.push(...task);
            }
        },
    },
});

export const { actions: tasksActions } = slice;

// create the slice hook for component
export const useTasksSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
