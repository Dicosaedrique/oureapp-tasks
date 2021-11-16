import ScheduleIcon from '@mui/icons-material/Schedule';
import Badge from 'app/components/Utils/Badge';
import { TaskState } from 'model/Task';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePreferencesSlice } from 'store/slices/preferences';
import { selectLimitDatePreferences } from 'store/slices/preferences/selectors';
import { diffInDays, formatDate } from 'utils';

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

    return (
        <Badge
            onClick={toggleRelativeTime}
            style={{
                backgroundColor: getLimitDateColor(
                    progress,
                    limitDatePreferences.thresholdWarning,
                    limitDatePreferences.thresholdDanger,
                    taskState,
                    remainingDays,
                ),
            }}
        >
            <ScheduleIcon style={{ fontSize: 'inherit', marginRight: '0.2em' }} />
            {limitDatePreferences.displayRelativeTime
                ? getRelativeTimeText(progress, remainingDays, taskState)
                : formatDate(limitDate)}
        </Badge>
    );
}

export const MemoLimitDateComponent = React.memo(LimitDateComponent);

const SUCCESS_COLOR = '#45e43f';
const WARNING_COLOR = '#ffa339';
const DANGER_COLOR = '#ff4d4d';

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
): string {
    switch (taskState) {
        case TaskState.DONE:
            if (remainingDays > 0) return SUCCESS_COLOR;
            else return DANGER_COLOR;

        default:
        case TaskState.TODO:
            if (progress < thresholdWarning) return SUCCESS_COLOR;
            else if (progress >= thresholdWarning && progress < thresholdDanger)
                return WARNING_COLOR;
            else return DANGER_COLOR;
    }
}

function getRelativeTimeText(
    progress: number,
    remainingDays: number,
    taskState: TaskState,
): string {
    switch (taskState) {
        case TaskState.TODO:
            return `${remainingDays} remaining days (${progress}%)`;

        case TaskState.DONE:
            return `Finished ${Math.abs(remainingDays)} days ${
                remainingDays < 0 ? 'late' : 'early'
            }`;

        default:
            return '???';
    }
}
