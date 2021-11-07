import {
    createSlice as createSliceOriginal,
    CreateSliceOptions,
    SliceCaseReducers,
} from '@reduxjs/toolkit';

import { RootStateKeyType } from './injector-typings';

/* Wrap createSlice with stricter Name options */

/* istanbul ignore next */
export const createSlice = <
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends RootStateKeyType
>(
    options: CreateSliceOptions<State, CaseReducers, Name>,
) => {
    return createSliceOriginal(options);
};
