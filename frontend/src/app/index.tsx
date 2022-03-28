import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomePage from 'app/pages/HomePage/Loadable';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';
import TaskPage from 'app/pages/TasksPage/Loadable';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const theme = createTheme({});

export type Theme = typeof theme;

export function App(): React.ReactElement {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="list">
                        <Route index element={<TaskPage index />} />
                        <Route path=":id" element={<TaskPage />} />

                        <Route path="archive">
                            <Route index element={<TaskPage index archive />} />
                            <Route path=":id" element={<TaskPage archive />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
