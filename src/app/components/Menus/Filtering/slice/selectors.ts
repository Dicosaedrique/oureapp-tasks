import { createSelector } from 'reselect';
import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.filtering || initialState;

/**
 * selector for filtering
 * @returns the "filtering" slice of global state
 */
export const selectFiltering = selectSlice;

/**
 * @returns filtering state
 */
export const selectFilteringState = createSelector(
    selectFiltering,
    filtering => filtering.state,
);

/**
 * @returns filtering limit date
 */
export const selectFilteringLimitDate = createSelector(
    selectFiltering,
    filtering => filtering.limitDate,
);

/**
 * @returns filtering priority
 */
export const selectFilteringPriority = createSelector(
    selectFiltering,
    filtering => filtering.priority,
);

/**
 * @returns filtering state
 */
export const selectFilteringCategory = createSelector(
    selectFiltering,
    filtering => filtering.category,
);
