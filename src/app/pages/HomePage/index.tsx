import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
    return (
        <>
            <Helmet>
                <title>Hello World !</title>
                <meta
                    name="description"
                    content="This will be the home page of the todo app !"
                />
            </Helmet>
            <Container component="main">
                <CssBaseline />
                <Typography variant="h3" gutterBottom>
                    Hello world !
                </Typography>
            </Container>
        </>
    );
}
