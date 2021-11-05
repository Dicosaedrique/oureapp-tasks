import { TaskSortMode } from 'model/Task/Sort';
import { SortingOrder } from 'utils/types';

/* --- STATE --- */
export interface SortingSliceState {
    mode: TaskSortMode;
    order: SortingOrder;
}
