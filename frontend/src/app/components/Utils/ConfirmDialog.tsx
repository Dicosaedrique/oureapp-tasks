import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface ConfirmDialogProps {
    open: boolean;
    handleSuccess: () => void;
    handleClose: () => void;
    title: string;
    description: string;
    confirmButton: string;
    closeButton: string;
}

export function ConfirmDialog({
    open,
    handleSuccess,
    handleClose,
    title,
    description,
    confirmButton,
    closeButton,
}: ConfirmDialogProps): React.ReactElement {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{closeButton}</Button>
                <Button onClick={handleSuccess} autoFocus>
                    {confirmButton}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
