import HomePage from 'app/pages/HomePage/Loadable';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';
import TaskPage from 'app/pages/TasksPage/Loadable';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/tasks/:listId?" component={TaskPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
}

// test
