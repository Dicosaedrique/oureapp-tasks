import { TaskPriority } from 'model/Task/Priority';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

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
        evt.stopPropagation();
    };

    return (
        <PriorityContainer
            onClick={toggleNames}
            style={{
                backgroundColor: priorityPreferences.prioritiesColors[priority],
            }}
        >
            {priorityPreferences.displayPriorityFullName
                ? priorityPreferences.prioritiesNames[priority]
                : priority}
        </PriorityContainer>
    );
}

// span used to contain priority
const PriorityContainer = styled.span`
    border-radius: 0.5em;
    color: #ffffff;
    padding: 0.15em 0.65em;
    font-size: 0.8em;
    cursor: pointer;
    user-select: none;

    &:hover {
        opacity: 0.9;
    }
`;
