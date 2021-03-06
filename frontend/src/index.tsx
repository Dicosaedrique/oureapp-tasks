/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// Use consistent styling
import 'sanitize.css/sanitize.css';
// Initialize languages
import 'locales/i18n';

// Import root app
import { App } from 'app';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
    <Provider store={store}>
        <HelmetProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </HelmetProvider>
    </Provider>,
    MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
    module.hot.accept(['./locales/i18n'], () => {
        // No need to render the App again because i18next works with the hooks
    });
}
