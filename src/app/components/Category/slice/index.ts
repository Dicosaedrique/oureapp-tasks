import { PayloadAction } from '@reduxjs/toolkit';
import { Category } from 'model/Category';
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
    reducers: {
        /**
         * Set a category in the record (if id exists, rename the category else add it)
         */
        setCategory(state, action: PayloadAction<Category>) {
            const category = action.payload;
            state[category.id] = category;
        },
    },
});

export const { actions: categoriesActions } = slice;

// create the slice hook for component
export const useCategoriesSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
