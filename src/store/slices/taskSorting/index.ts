import { PayloadAction } from '@reduxjs/toolkit';
import { TaskSortMode } from 'model/Task/Sort';
import { SortingSliceState } from 'store/slices/taskSorting/types';
import { useInjectReducer } from 'utils/redux-injectors';
import { createSlice } from 'utils/redux-toolkit';

/**
 * Initial state of sorting (by creation date)
 */
export const initialState: SortingSliceState = {
    mode: 'creationDate',
    order: false,
};

// create a redux slice for sorting
const slice = createSlice({
    name: 'taskSorting',
    initialState,
    reducers: {
        /**
         * Set the sorting mode
         */
        setSortingMode(state, action: PayloadAction<TaskSortMode>) {
            state.mode = action.payload;
        },

        /**
         * Toggle the sorting order (asc / des)
         */
        toggleSortingOrder(state) {
            state.order = !state.order;
        },
    },
});

// create the slice hook for component
export const useSortingSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
