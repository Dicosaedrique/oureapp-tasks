import { createSelector } from 'reselect';
import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.categories || initialState;

/**
 * selector for categories
 * @returns the "categories" slice of global state
 */
export const selectCategories = selectSlice;

/**
 * selector for categories (by ID)
 * @param {string} id id of the category to get
 * @return selector for the given category
 */
export function getCategoryById(id: string) {
    return createSelector(selectCategories, categories => categories[id]);
}
