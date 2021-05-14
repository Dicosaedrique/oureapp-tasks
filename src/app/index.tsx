/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';

export function App() {
    const { i18n } = useTranslation();
    return (
        <BrowserRouter>
            <Helmet
                titleTemplate="%s"
                defaultTitle="no-name-yet"
                htmlAttributes={{ lang: i18n.language }}
            >
                <meta name="description" content="todo description" />
            </Helmet>

            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
}
