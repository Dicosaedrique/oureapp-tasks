import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { DEFAULT_LIST_ID } from 'model/TaskList';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function HomePage(): React.ReactElement {
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
            <Link to={`/list/${DEFAULT_LIST_ID}`}>Go to tasks !</Link>
            <p>Made By Dicosaedrique</p>
        </Container>
    );
}
