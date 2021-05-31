import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import { useTasksSlice } from 'app/components/Task/slice';
import { TaskInputProps } from 'model/Task';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { TaskMenu } from './TaskMenu';

export function AddTaskMenu() {
    const [open, setOpen] = React.useState(false);

    const { actions } = useTasksSlice();
    const dispatch = useDispatch();

    const openMenu = () => setOpen(true);
    const closeMenu = () => setOpen(false);

    const createTask = (inputProps: TaskInputProps) => {
        setOpen(false);
        dispatch(actions.addTask(inputProps));
    };

    return (
        <div>
            {/* Create button */}
            <Hidden mdUp>
                <FabContainer>
                    <Fab
                        color="primary"
                        aria-label="add task"
                        onClick={openMenu}
                    >
                        <AddIcon />
                    </Fab>
                </FabContainer>
            </Hidden>
            <Hidden smDown>
                <Button
                    color="primary"
                    aria-label="add task"
                    variant="contained"
                    onClick={openMenu}
                    startIcon={<AddIcon />}
                >
                    Add task
                </Button>
            </Hidden>
            {open && (
                <TaskMenu handleClose={closeMenu} handleSuccess={createTask} />
            )}
        </div>
    );
}

const FabContainer = styled.div`
    position: fixed;
    bottom: 2em;
    right: 2em;
    z-index: 1050;
`;
