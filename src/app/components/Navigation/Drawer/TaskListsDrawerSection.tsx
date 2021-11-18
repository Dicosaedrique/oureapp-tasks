import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MenuItem } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import { CreateListMenu } from 'app/components/Menus/List/CreateListMenu';
import { EditListMenu } from 'app/components/Menus/List/EditListMenu';
import { TasksPagePathParams } from 'app/pages/TasksPage';
import { DEFAULT_LIST_ID, TaskListBase } from 'model/TaskList';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTaskListsSlice } from 'store/slices/taskLists';
import {
    selectDefaultTaskListBase,
    selectTaskListsBaseOrderedByCreationDate,
} from 'store/slices/taskLists/selectors';
import { Id } from 'utils/types';

export default function TaskListsDrawerSection(): React.ReactElement {
    const params = useParams() as TasksPagePathParams;

    const { actions } = useTaskListsSlice();
    const dispatch = useDispatch();

    const defaultList = useSelector(selectDefaultTaskListBase);

    const lists = useSelector(selectTaskListsBaseOrderedByCreationDate).filter(
        list => list.id !== DEFAULT_LIST_ID,
    );

    const navigate = useNavigate();
    const createTaskListNavigationHandler = (id: Id) => () => navigate(`/list/${id}`);
    const defaultTaskListNavigationHandler = createTaskListNavigationHandler(DEFAULT_LIST_ID);

    const [selectedList, setSelectedList] = React.useState<TaskListBase | null>(null);

    // create list menu
    const [createMenuOpen, setCreateMenuOpen] = React.useState(false);
    const openCreateMenu = () => setCreateMenuOpen(true);
    const closeCreateMenu = () => setCreateMenuOpen(false);

    // edit list menu
    const [editMenuOpen, setEditMenuOpen] = React.useState(false);
    const openEditListMenu = () => {
        setEditMenuOpen(true);
        setAnchorEl(null);
    };
    const closeEditListMenu = () => setEditMenuOpen(false);

    // delete list
    const deleteList = () => {
        if (selectedList == null) return;
        dispatch(actions.deleteList({ id: selectedList.id }));
        setAnchorEl(null);
        if (params.id === selectedList.id) defaultTaskListNavigationHandler();
    };

    // options menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openOptionsCreator = (list: TaskListBase) => (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setSelectedList(list);
    };
    const closeOptions = () => {
        setAnchorEl(null);
        setSelectedList(null);
    };
    const isOptionsMenuOpen = Boolean(anchorEl);

    return (
        <>
            <List>
                <ListItem
                    button
                    selected={params.id === defaultList.id}
                    onClick={defaultTaskListNavigationHandler}
                >
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary={defaultList.title} />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            onClick={openOptionsCreator(defaultList)}
                            aria-label="Options"
                            title="Options"
                            size="large"
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            <Divider />
            <List>
                {lists.map(list => (
                    <ListItem
                        button
                        selected={params.id === list.id}
                        onClick={createTaskListNavigationHandler(list.id)}
                        key={list.id}
                    >
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary={list.title} />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                onClick={openOptionsCreator(list)}
                                aria-label="Options"
                                title="Options"
                                size="large"
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
                <ListItem button onClick={openCreateMenu}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add list" />
                </ListItem>
            </List>
            {createMenuOpen && <CreateListMenu handleClose={closeCreateMenu} />}
            {editMenuOpen && selectedList !== null && (
                <EditListMenu handleClose={closeEditListMenu} list={selectedList} />
            )}
            {isOptionsMenuOpen && (
                <Menu
                    id="list-options-menu"
                    aria-haspopup="true"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={closeOptions}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >
                    <MenuItem onClick={openEditListMenu} style={{ color: '#4e58ee' }}>
                        <EditIcon />
                        &nbsp;&nbsp;Edit List
                    </MenuItem>
                    {selectedList?.id !== DEFAULT_LIST_ID && (
                        <MenuItem onClick={deleteList} style={{ color: 'red' }}>
                            <DeleteIcon />
                            &nbsp;&nbsp;Delete list
                        </MenuItem>
                    )}
                </Menu>
            )}
        </>
    );
}

export const MemoTaskListsDrawerSection = React.memo(TaskListsDrawerSection);
