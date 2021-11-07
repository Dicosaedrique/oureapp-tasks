import { createSelector } from 'reselect';
import { RootState } from 'store/StoreRootState';

import { initialState } from '.';

const selectSlice = (state: RootState) => state?.preferences || initialState;

export const selectPreferences = selectSlice;

export const selectPriorityPreferences = createSelector(
    selectPreferences,
    preferences => preferences.priority,
);

export const selectLimitDatePreferences = createSelector(
    selectPreferences,
    preferences => preferences.limitDate,
);
