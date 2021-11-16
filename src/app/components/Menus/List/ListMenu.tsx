import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TaskListInputProps } from 'model/TaskList';
import React from 'react';
import styled from 'styled-components/macro';

export interface ListMenuProps {
    dialogTitle: string;
    handleClose: () => void;
    handleSubmit: (listProps: TaskListInputProps) => void;
    submitButtonTitle: string;
    defaultListProps?: TaskListInputProps;
}

export function ListMenu({
    dialogTitle,
    defaultListProps,
    handleClose,
    handleSubmit,
    submitButtonTitle,
}: ListMenuProps): React.ReactElement {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const formId = 'list-form-id';
    const dialogId = 'list-dialog';

    const [title, setTitle] = React.useState(defaultListProps?.title || '');
    const [titleError, setTitleError] = React.useState<string | null>(null);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setTitle(newTitle);

        // remove title error if title change and is not empty
        if (titleError !== null && newTitle.trim().length > 0) setTitleError(null);
    };

    const submit = event => {
        event.preventDefault();

        const finalTitle = title.trim();
        if (finalTitle.length > 0) {
            handleSubmit({ title: finalTitle });
        } else {
            setTitleError('List title is required !');
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
            <DialogTitle id={dialogId}>{dialogTitle}</DialogTitle>
            <DialogContent>
                <form id={formId} onSubmit={submit}>
                    <FormSection>
                        <TextField
                            id="list-title"
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
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={submit}
                    color="primary"
                    variant="contained"
                    form={formId}
                    type="submit"
                >
                    {submitButtonTitle}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const FormSection = styled.div`
    margin: 0 0 1em 0;
`;
