import ScheduleIcon from '@mui/icons-material/Schedule';
import Chip from '@mui/material/Chip';
import { TaskState } from 'model/Task';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePreferencesSlice } from 'store/slices/preferences';
import { selectLimitDatePreferences } from 'store/slices/preferences/selectors';
import { diffInDays, formatDate } from 'utils';
import { MuiPaletteColors } from 'utils/types';

interface Props {
    nowDate: number; // current date (if task is finished it will be the finished date)
    startDate: number;
    limitDate: number;
    taskState: TaskState;
}

export function LimitDateComponent({
    nowDate,
    startDate,
    limitDate,
    taskState,
}: Props): React.ReactElement {
    // redux hooks
    const { actions } = usePreferencesSlice();
    const limitDatePreferences = useSelector(selectLimitDatePreferences);
    const dispatch = useDispatch();

    // toggle relative time display with dispatched action
    const toggleRelativeTime = (evt: React.MouseEvent<HTMLSpanElement>) => {
        dispatch(actions.toggleDisplayRelativeTime());
        evt.stopPropagation(); // so it don't trigger the task component and check it
    };

    // progress of the task (in percentage)
    const progress = Math.round(((nowDate - startDate) / (limitDate - startDate)) * 100);

    const remainingDays = diffInDays(nowDate, limitDate);

    const chipColor = getLimitDateColor(
        progress,
        limitDatePreferences.thresholdWarning,
        limitDatePreferences.thresholdDanger,
        taskState,
        remainingDays,
    );

    const chipLabel = limitDatePreferences.displayRelativeTime
        ? getRelativeTimeText(progress, remainingDays, taskState)
        : formatDate(limitDate);

    return (
        <Chip
            size="small"
            label={chipLabel}
            icon={<ScheduleIcon />}
            color={chipColor}
            onClick={toggleRelativeTime}
        />
    );
}

export const MemoLimitDateComponent = React.memo(LimitDateComponent);

/**
 * @param progress current progress percent
 * @param thresholdWarning threshold before warning
 * @param thresholdDanger threshold before danger
 * @param taskState task state
 * @param remainingDays remaining days between now and limit
 * @returns the adapted color for the progress based on the thresholds
 */
function getLimitDateColor(
    progress: number,
    thresholdWarning: number,
    thresholdDanger: number,
    taskState: TaskState,
    remainingDays: number,
): MuiPaletteColors {
    switch (taskState) {
        case TaskState.DONE:
            if (remainingDays > 0) return 'success';
            else return 'error';

        default:
        case TaskState.TODO:
            if (remainingDays >= 0) {
                if (progress < thresholdWarning) return 'success';
                else if (progress >= thresholdWarning && progress < thresholdDanger)
                    return 'warning';
                else return 'error';
            } else {
                return 'error';
            }
    }
}

function getRelativeTimeText(
    progress: number,
    remainingDays: number,
    taskState: TaskState,
): string {
    switch (taskState) {
        case TaskState.TODO:
            if (remainingDays < 0) {
                return `${Math.abs(remainingDays)} days late!`;
            } else {
                return `${remainingDays} remaining days (${progress}%)`;
            }

        case TaskState.DONE:
            return `Finished ${Math.abs(remainingDays)} days ${
                remainingDays < 0 ? 'late' : 'early'
            }`;

        default:
            return '???';
    }
}
