import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export function HomePage() {
    return (
        <Container component="main">
            <CssBaseline />
            <Typography variant="h3" style={{ textAlign: 'center', margin: '1em 0' }}>
                Welcome to the todo app !
            </Typography>
            <p>This page is a work in progress</p>
        </Container>
    );
}
