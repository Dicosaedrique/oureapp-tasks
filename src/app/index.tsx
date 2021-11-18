import { StyledEngineProvider } from '@mui/material/styles';
import HomePage from 'app/pages/HomePage/Loadable';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';
import TaskPage from 'app/pages/TasksPage/Loadable';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function App(): React.ReactElement {
    return (
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <HomePage />
                    </Route>
                    <Route path="/tasks/:listId?">
                        <TaskPage />
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Routes>
            </BrowserRouter>
        </StyledEngineProvider>
    );
}
