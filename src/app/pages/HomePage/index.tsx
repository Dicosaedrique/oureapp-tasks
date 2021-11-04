import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { MemoCategoryContainer } from 'app/components/Category';
import { FilteringMenu } from 'app/components/Menus/Filtering';
import { SortingMenu } from 'app/components/Menus/Sorting';
import { AddTaskMenu } from 'app/components/Menus/Task/AddTaskMenu';
import { RewarderProvider } from 'app/components/Reward/context';
import { selectSmartSeparatedTasks } from 'app/components/Task/slice/selectors';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import { usePreferencesSlice } from './preferencesSlice';
import { selectCategoriesPreferences } from './preferencesSlice/selectors';

export function HomePage() {
    const { actions: preferencesActions } = usePreferencesSlice();

    const categoriesContainerProps = useSelector(selectSmartSeparatedTasks);

    const dispatch = useDispatch();

    // temp (to test toggle of tasks separation)
    const categoriesPreferences = useSelector(selectCategoriesPreferences);
    const handleToggleCategoriesSeparation = () => {
        dispatch(preferencesActions.toggleCategoriesSeparation());
    };

    return (
        <>
            <Helmet>
                <title>Hello World !</title>
                <meta name="description" content="This will be the home page of the todo app !" />
            </Helmet>
            <RewarderProvider>
                <Container component="main">
                    <CssBaseline />
                    <Typography variant="h3" style={{ textAlign: 'center', margin: '1em 0' }}>
                        What I want to do
                    </Typography>
                    <AddTaskMenu />
                    <FilteringMenu />
                    <SortingMenu />
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'flex-end',
                            margin: '0.5em 0 1em 0',
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={categoriesPreferences.enableCategoriesSeparation}
                                    onChange={handleToggleCategoriesSeparation}
                                />
                            }
                            label="Separate by categories"
                        />
                    </div>
                    {categoriesContainerProps.map(categoryContainerProps => (
                        <MemoCategoryContainer
                            key={categoryContainerProps.id}
                            {...categoryContainerProps}
                        />
                    ))}
                </Container>
            </RewarderProvider>
        </>
    );
}
