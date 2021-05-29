import { TaskSortMode } from 'model/Task/Sort';
import { SortingOrder } from 'utils/types/types';

/* --- STATE --- */
export interface SortingSliceState {
    mode: TaskSortMode;
    order: SortingOrder;
}
