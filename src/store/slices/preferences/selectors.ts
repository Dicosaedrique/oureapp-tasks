import { createSelector } from 'reselect';
import { RootState } from 'store/StoreRootState';

import { initialState } from '.';

const selectSlice = (state: RootState) => state?.preferences || initialState;

/**
 * selector for preferences
 * @returns the "preferences" slice of global state
 */
export const selectPreferences = selectSlice;

/**
 * @returns the priority preferences
 */
export const selectPriorityPreferences = createSelector(
    selectPreferences,
    preferences => preferences.priority,
);

/**
 * @returns the limit date preferences
 */
export const selectLimitDatePreferences = createSelector(
    selectPreferences,
    preferences => preferences.limitDate,
);
