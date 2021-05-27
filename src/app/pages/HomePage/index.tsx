import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { FilteringMenu } from 'app/components/Menus/Filtering';
import { SortingMenu } from 'app/components/Menus/Sorting';
import { Rewarder } from 'app/components/Reward';
import { RewarderProvider } from 'app/components/Reward/context';
import { MemoCategoryContainer } from 'app/components/Task/Category';
import { useTasksSlice } from 'app/components/Task/slice';
import {
    selectCategoriesPreferences,
    selectSmartSeparatedTasks,
} from 'app/components/Task/slice/selectors';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

export function HomePage() {
    const [title, setTitle] = React.useState('');

    const [rewarder, setRewarder] = React.useState<Rewarder | null>(null);
    const rewarderRef = React.useCallback((rewarderElem: Rewarder) => {
        setRewarder(rewarderElem);
    }, []);

    const { actions } = useTasksSlice();

    const categoriesContainerProps = useSelector(selectSmartSeparatedTasks);

    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (title.length > 0) dispatch(actions.addTask({ title }));
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value as string;
        setTitle(newTitle);
    };

    // temp (to test toggle of tasks separation)
    const categoriesPreferences = useSelector(selectCategoriesPreferences);
    const handleToggleCategoriesSeparation = () => {
        dispatch(actions.toggleCategoriesSeparation());
    };

    return (
        <>
            <Helmet>
                <title>Hello World !</title>
                <meta
                    name="description"
                    content="This will be the home page of the todo app !"
                />
            </Helmet>
            <RewarderProvider value={rewarder}>
                <Container component="main">
                    <CssBaseline />
                    <Typography variant="h3" gutterBottom>
                        Todo app !!!
                    </Typography>
                    <TextField
                        label="Task title (temp)"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddTask}
                    >
                        Add task (temp)
                    </Button>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    categoriesPreferences.enableCategoriesSeparation
                                }
                                onChange={handleToggleCategoriesSeparation}
                            />
                        }
                        label="Separate tasks by categories"
                    />
                    <FilteringMenu />
                    <SortingMenu />
                    <br />
                    {categoriesContainerProps.map(categoryContainerProps => (
                        <MemoCategoryContainer
                            key={categoryContainerProps.id}
                            {...categoryContainerProps}
                        />
                    ))}
                </Container>
            </RewarderProvider>
            <Rewarder ref={rewarderRef} />
        </>
    );
}
