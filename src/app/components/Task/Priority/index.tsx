import Badge from 'app/components/Utils/Badge';
import { TaskPriority } from 'model/Task/Priority';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePreferencesSlice } from 'store/slices/preferences';
import { selectPriorityPreferences } from 'store/slices/preferences/selectors';

interface Props {
    priority: TaskPriority;
}

export function PriorityComponent({ priority }: Props): React.ReactElement {
    const { actions } = usePreferencesSlice();

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

export const MemoPriorityComponent = React.memo(PriorityComponent);
