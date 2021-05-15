import Badge from 'app/components/StyledComponents/Badge';
import { TaskPriority } from 'model/Task/Priority';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTasksSlice } from '../slice';
import { selectPriorityPreferences } from '../slice/selectors';

interface Props {
    priority: TaskPriority;
}

/**
 * basic component to render a task priority
 * @param props the task priority
 */
export function PriorityComponent({ priority }: Props) {
    const { actions } = useTasksSlice();

    const priorityPreferences = useSelector(selectPriorityPreferences);
    const dispatch = useDispatch();

    const toggleNames = (evt: React.MouseEvent<HTMLSpanElement>) => {
        dispatch(actions.toggleDisplayPriorityFullName());
        evt.stopPropagation(); // so it don't trigger the task component and check it
    };

    return (
        <Badge
            onClick={toggleNames}
            style={{
                backgroundColor: priorityPreferences.prioritiesColors[priority],
            }}
        >
            {priorityPreferences.displayPriorityFullName
                ? priorityPreferences.prioritiesNames[priority]
                : priority}
        </Badge>
    );
}
