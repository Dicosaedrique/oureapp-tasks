import { CATEGORIES_DEMO } from 'model/demo.data';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';

import { CategoriesSliceState } from './types';

/**
 * Default state of categories
 */
export const initialState: CategoriesSliceState = CATEGORIES_DEMO;

// create a redux slice for tasks
const slice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
});

export const { actions: categoriesActions } = slice;

// create the slice hook for component
export const useTasksSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
