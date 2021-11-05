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
        removeTask(
            state,
            { payload: { taskID, taskState, taskListID } }: PayloadAction<PayloadRemoveTask>,
        ) {
            if (state[taskListID] === undefined) return;

            const taskIndex = state[taskListID]!.tasks[taskState].findIndex(
                task => task.id === taskID,
            );
            if (taskIndex !== -1) state[taskListID]!.tasks[taskState].splice(taskIndex, 1);
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
        setTaskState(
            state,
            {
                payload: { taskID, taskState, newTaskState, taskListID },
            }: PayloadAction<PayloadUpdateTaskState>,
        ) {
            if (state[taskListID] === undefined) return;

            const taskIndex = state[taskListID]!.tasks[taskState].findIndex(
                task => task.id === taskID,
            );

            if (
                taskIndex !== -1 &&
                state[taskListID]!.tasks[taskState][taskIndex].state !== newTaskState
            ) {
                const [taskToUpdate] = state[taskListID]!.tasks[taskState].splice(taskIndex, 1);
                state[taskListID]!.tasks[newTaskState].push(
                    setTaskState(taskToUpdate, newTaskState),
                );
            }
        },
        archiveTask(
            state,
            { payload: { taskID, taskState, taskListID } }: PayloadAction<PayloadArchiveTask>,
        ) {
            if (state[taskListID] === undefined) return;

            const taskIndex = state[taskListID]!.tasks[taskState].findIndex(
                task => task.id === taskID,
            );
            if (taskIndex !== -1) {
                const [taskToArchive] = state[taskListID]!.tasks[taskState].splice(taskIndex, 1);
                // todo : archive the task
                console.log(`Archive task ${taskID}`);
            }
        },
    },
});

// create the slice hook for component
export const useTaskListsSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
