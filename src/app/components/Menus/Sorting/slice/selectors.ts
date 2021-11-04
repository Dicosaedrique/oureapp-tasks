import { createSelector } from 'reselect';
import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.sorting || initialState;

/**
 * selector for sorting
 * @returns the "sorting" slice of global state
 */
export const selectSorting = selectSlice;

/**
 * @returns the sorting mode
 */
export const selectSortingMode = createSelector(selectSorting, sorting => sorting.mode);

/**
 * @returns the sorting order
 */
export const selectSortingOrder = createSelector(selectSorting, sorting => sorting.order);
