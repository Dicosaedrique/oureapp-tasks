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
                    <Route index element={<HomePage />} />
                    <Route path="list">
                        <Route path=":id" element={<TaskPage />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </StyledEngineProvider>
    );
}
// rename tasks en list ?
