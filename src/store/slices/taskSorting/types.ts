import { TaskSortMode } from 'model/Task/Sort';
import { SortingOrder } from 'utils/types';

export interface SortingSliceState {
    mode: TaskSortMode;
    order: SortingOrder;
}
