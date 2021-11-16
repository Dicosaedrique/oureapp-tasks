import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Task, TaskInputProps } from 'model/Task';
import { DEFAULT_TASK_PRIORITIES_NAMES, TaskPriority } from 'model/Task/Priority';
import React from 'react';
import styled from 'styled-components/macro';

export interface EditTaskMenuProps {
    task: Task;
    handleClose: () => void;
    handleSubmit: (taskProps: TaskInputProps) => void;
}

export function EditTaskMenu({
    task,
    handleClose,
    handleSubmit,
}: EditTaskMenuProps): React.ReactElement {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const formId = 'task-form-id';
    const dialogId = 'edit-task-dialog';

    ///////////////////////////////////////////////
    // TITLE

    const [title, setTitle] = React.useState(task.title);
    const [titleError, setTitleError] = React.useState<string | null>(null);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setTitle(newTitle);

        // remove title error if title change and is not empty
        if (titleError !== null && newTitle.trim().length > 0) setTitleError(null);
    };

    ///////////////////////////////////////////////
    // PRIORITY

    const [priority, setPriority] = React.useState(task.priority);

    const handlePriorityChange = (event: React.ChangeEvent<{ value: unknown }>, _) => {
        setPriority(event.target.value as TaskPriority);
    };

    ///////////////////////////////////////////////
    // LIMIT DATE

    const [hasLimitDate, setHasLimitDate] = React.useState(task.limitDate !== undefined);

    const [limitDate, setLimitDate] = React.useState(new Date(task.limitDate || Date.now()));

    const handleHasLimitDateChange = (_, checked: boolean) => {
        setHasLimitDate(checked);
    };

    const handleLimitDateChange = (date: Date | null) => {
        if (date !== null) setLimitDate(date);
    };

    ///////////////////////////////////////////////
    // RESET

    const reset = () => {
        setTitle(task.title);
        setPriority(task.priority);
        setHasLimitDate(task.limitDate !== undefined);
        setLimitDate(new Date(task.limitDate || Date.now()));
    };

    ///////////////////////////////////////////////
    // SUBMIT CHANGES

    const submit = event => {
        event.preventDefault();

        const finalTitle = title.trim();
        if (finalTitle.length > 0) {
            handleSubmit({
                title: finalTitle,
                priority,
                limitDate: hasLimitDate ? limitDate.getTime() : undefined,
            });

            reset();
        } else {
            setTitleError('Task title is required !');
        }
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open
            fullWidth
            maxWidth="sm"
            onClose={handleClose}
            aria-labelledby={dialogId}
        >
            <DialogTitle id={dialogId}>{`Edit your task "${task.title}"`}</DialogTitle>
            <DialogContent>
                <form id={formId} onSubmit={submit} onReset={reset}>
                    {/* Task title */}
                    <FormSection>
                        <TextField
                            id="task-title"
                            label="Title"
                            placeholder="Be happy !"
                            fullWidth
                            value={title}
                            onChange={handleTitleChange}
                            autoFocus
                            error={titleError !== null}
                            helperText={titleError !== null && titleError}
                            required
                        />
                    </FormSection>

                    {/* Task priority */}
                    <FormSection>
                        <FormControl>
                            <InputLabel id="priority-picker">Priority</InputLabel>
                            <Select
                                labelId="priority-picker-label"
                                id="priority-picker"
                                value={priority}
                                onChange={handlePriorityChange}
                            >
                                {PRIORITIES.map(([name, value]) => (
                                    <MenuItem key={value} value={value}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </FormSection>

                    {/* Task limit date */}
                    <FormSection>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasLimitDate}
                                    onChange={handleHasLimitDateChange}
                                />
                            }
                            label="Add limit date"
                        />
                        {hasLimitDate && (
                            <div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        id="limit-date-picker-dialog"
                                        label="Limit Date"
                                        value={limitDate}
                                        onChange={handleLimitDateChange}
                                        format="MM/dd/yyyy"
                                        placeholder="MM/dd/yyyy"
                                        KeyboardButtonProps={{
                                            'aria-label': 'change limit date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        )}
                    </FormSection>
                </form>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" form={formId} type="reset">
                    Reset
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={submit}
                    color="primary"
                    variant="contained"
                    form={formId}
                    type="submit"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

/**
 * Priorities (for display)
 */
const PRIORITIES: [name: string, value: TaskPriority][] = [
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.NONE], TaskPriority.NONE],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.LOW], TaskPriority.LOW],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.MEDIUM], TaskPriority.MEDIUM],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.HIGH], TaskPriority.HIGH],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.EXTREME], TaskPriority.EXTREME],
];

const FormSection = styled.div`
    margin: 0 0 1em 0;
`;
