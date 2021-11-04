// @ts-ignore
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { selectCategories } from 'app/components/Category/slice/selectors';
import { Category } from 'model/TaskList';
import { TaskID, TaskInputProps } from 'model/Task';
import {
    DEFAULT_TASK_PRIORITIES_NAMES,
    DEFAULT_TASK_PRIORITY,
    TaskPriority,
} from 'model/Task/Priority';
import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { recordToArray } from 'utils/utils';

export interface TaskMenuProps {
    id?: TaskID; // optional task id (if this is a task edition instead of a task creation)
    defaultTask?: Partial<TaskInputProps>;
    handleClose: () => void; // close or cancel
    handleSuccess: (props: TaskInputProps, id?: string) => void; // close because of success
}

export function TaskMenu({ id, defaultTask = {}, handleClose, handleSuccess }: TaskMenuProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const add = id === undefined;
    const formId = 'task-form-id';

    ///////////////////////////////////////////////
    // TITLE

    const [title, setTitle] = React.useState(defaultTask.title || '');
    const [titleError, setTitleError] = React.useState<string | null>(null);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setTitle(newTitle);

        // remove title error if title change and is not empty
        if (titleError !== null && newTitle.length > 0) setTitleError(null);
    };

    ///////////////////////////////////////////////
    // PRIORITY

    const [priority, setPriority] = React.useState(defaultTask.priority || DEFAULT_TASK_PRIORITY);

    const handlePriorityChange = (event: React.ChangeEvent<{ value: unknown }>, _) => {
        setPriority(event.target.value as TaskPriority);
    };

    ///////////////////////////////////////////////
    // LIMIT DATE

    const [hasLimitDate, setHasLimitDate] = React.useState(defaultTask.limitDate !== undefined);

    const [limitDate, setLimitDate] = React.useState(new Date(defaultTask.limitDate || Date.now()));

    const handleHasLimitDateChange = (_, checked: boolean) => {
        setHasLimitDate(checked);
    };

    const handleLimitDateChange = (date: Date | null) => {
        if (date !== null) setLimitDate(date);
    };

    ///////////////////////////////////////////////
    // CATEGORY

    const categories = useSelector(selectCategories);

    const categoriesOptions = recordToArray(categories).filter(
        category => category !== undefined,
    ) as Category[];

    const [category, setCategory] = React.useState<Category | null>(
        categoriesOptions.find(category => category.id === defaultTask.category) || null,
    );

    const handleCategoryChange = (_1, value: Category | null, _2, _3) => {
        setCategory(value);
    };

    ///////////////////////////////////////////////
    // RESET / SUCCESS

    /**
     * Reset form
     */
    const reset = () => {
        setTitle('');
        setPriority(TaskPriority.NONE);
        setHasLimitDate(false);
        setLimitDate(new Date(Date.now()));
        setCategory(null);
    };

    /**
     * Validate (create / edit task)
     */
    const validate = () => {
        if (title.length > 0) {
            handleSuccess(
                {
                    title,
                    priority,
                    limitDate: hasLimitDate ? limitDate.getTime() : undefined,
                    category: category === null ? undefined : category.id,
                },
                id,
            );

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
            aria-labelledby="create-edit-task-dialog"
        >
            <DialogTitle id="create-edit-task-dialog">
                {add ? 'Add a new task to your list' : `Edit your task "${defaultTask.title}"`}
            </DialogTitle>
            <DialogContent>
                <form id={formId} onSubmit={validate} onReset={reset}>
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

                    {/* Task category */}
                    <FormSection>
                        <Autocomplete
                            id="category-picker"
                            value={category}
                            onChange={handleCategoryChange}
                            options={categoriesOptions}
                            getOptionLabel={obj => obj.title}
                            renderInput={params => (
                                <TextField {...params} label="Category (optional)" />
                            )}
                        />
                    </FormSection>
                </form>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" form={formId} type="reset">
                    Reset
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={validate}
                    color="primary"
                    variant="contained"
                    form={formId}
                    type="submit"
                >
                    {add ? 'Add' : 'Save'}
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
