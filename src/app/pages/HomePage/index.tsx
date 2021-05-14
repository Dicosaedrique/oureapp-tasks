import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useTasksSlice } from 'app/components/Task/slice';
import {
    selectDoneTasks,
    selectTodoTasks,
} from 'app/components/Task/slice/selectors';
import { TaskContainer } from 'app/components/TaskContainer';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

export function HomePage() {
    const [title, setTitle] = React.useState('');

    const { actions } = useTasksSlice();

    const todoTasks = useSelector(selectTodoTasks);
    const doneTasks = useSelector(selectDoneTasks);

    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (title.length > 0) dispatch(actions.addTask({ title }));
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value as string;
        setTitle(newTitle);
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
                <Typography variant="h4" gutterBottom>
                    Todo
                </Typography>
                <TaskContainer tasks={todoTasks} />
                <Typography variant="h4" gutterBottom>
                    Done
                </Typography>
                <TaskContainer tasks={doneTasks} />
            </Container>
        </>
    );
}
