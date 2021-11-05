import { createSelector } from 'reselect';
import { RootState } from 'store/StoreRootState';

import { initialState } from '.';

const selectSlice = (state: RootState) => state?.taskFiltering || initialState;

/**
 * selector for filtering
 * @returns the "filtering" slice of global state
 */
export const selectFilteringSettings = selectSlice;

/**
 * @returns filtering state
 */
export const selectFilteringState = createSelector(
    selectFilteringSettings,
    filtering => filtering.state,
);

/**
 * @returns filtering limit date
 */
export const selectFilteringLimitDate = createSelector(
    selectFilteringSettings,
    filtering => filtering.limitDate,
);

/**
 * @returns filtering priority
 */
export const selectFilteringPriority = createSelector(
    selectFilteringSettings,
    filtering => filtering.priority,
);
