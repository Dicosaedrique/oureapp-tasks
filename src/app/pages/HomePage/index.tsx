import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function HomePage() {
    return (
        <Container component="main">
            <Helmet>
                <title>Welcome to Oureapp Task</title>
            </Helmet>
            <CssBaseline />
            <Typography variant="h3" style={{ textAlign: 'center', margin: '1em 0' }}>
                Welcome to the todo app !
            </Typography>
            <p>This page is a work in progress</p>
            <Link to={'/tasks'}>Go to tasks !</Link>
        </Container>
    );
}
