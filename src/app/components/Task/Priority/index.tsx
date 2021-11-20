import Chip from '@mui/material/Chip';
import { TaskPriority } from 'model/Task/Priority';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePreferencesSlice } from 'store/slices/preferences';
import { selectPriorityPreferences } from 'store/slices/preferences/selectors';
import { MuiPaletteColors } from 'utils/types';

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

    const chipLabel = priorityPreferences.displayPriorityFullName
        ? priorityPreferences.prioritiesNames[priority]
        : priority;

    const chipColor = getPriorityColor(priority);

    return (
        <Chip
            size="small"
            label={chipLabel}
            // icon={<ScheduleIcon />}
            color={chipColor}
            onClick={toggleNames}
        />
    );
}

function getPriorityColor(priority: TaskPriority): MuiPaletteColors {
    switch (priority) {
        case TaskPriority.HIGH:
            return 'error';
        case TaskPriority.MEDIUM:
            return 'warning';
        case TaskPriority.LOW:
            return 'success';
        default:
            return 'default';
    }
}

export const MemoPriorityComponent = React.memo(PriorityComponent);
