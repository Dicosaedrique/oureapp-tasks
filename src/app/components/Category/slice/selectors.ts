import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.categories || initialState;

/**
 * selector for categories
 * @returns the "categories" slice of global state
 */
export const selectCategories = selectSlice;
