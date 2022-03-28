import { createSelector } from 'reselect';
import { PreferencesSliceState } from 'store/slices/preferences/types';
import { RootState } from 'store/StoreRootState';

import { initialState } from '.';

const selectSlice = (state: RootState): PreferencesSliceState => state?.preferences || initialState;

export const selectPreferences = selectSlice;

export const selectPriorityPreferences = createSelector(
    selectPreferences,
    preferences => preferences.priority,
);

export const selectLimitDatePreferences = createSelector(
    selectPreferences,
    preferences => preferences.limitDate,
);
