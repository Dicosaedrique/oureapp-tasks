/**
 *
 * TaskContainer
 *
 */
import { Task } from 'model/Task';
import * as React from 'react';

import { TaskComponent } from '../Task';

interface Props {
    tasks: Task[];
}

/**
 * Display a list of tasks
 * @param props list of tasks
 */
export function TaskContainer({ tasks }: Props) {
    return (
        <div>
            {tasks.map(task => (
                <TaskComponent key={task.id} {...task} />
            ))}
        </div>
    );
}
