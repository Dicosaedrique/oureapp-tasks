import { MenuItem } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CreateListMenu } from 'app/components/Menus/List/CreateListMenu';
import { EditListMenu } from 'app/components/Menus/List/EditListMenu';
import { TasksPagePathParams } from 'app/pages/TasksPage';
import { DEFAULT_LIST_ID, TaskListBase } from 'model/TaskList';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useTaskListsSlice } from 'store/slices/taskLists';
import {
    selectDefaultTaskListBase,
    selectTaskListsBaseOrderedByCreationDate,
} from 'store/slices/taskLists/selectors';
import { Id } from 'utils/types';

export default function TaskListsDrawerSection(): React.ReactElement {
    let current = useParams<TasksPagePathParams>().listId;
    if (current === undefined) current = DEFAULT_LIST_ID;

    const { actions } = useTaskListsSlice();
    const dispatch = useDispatch();

    const defaultList = useSelector(selectDefaultTaskListBase);

    const lists = useSelector(selectTaskListsBaseOrderedByCreationDate).filter(
        list => list.id !== DEFAULT_LIST_ID,
    );

    const history = useHistory();
    const createTaskListNavigationHandler = (id: Id) => () => history.push(`/tasks/${id}`);
    const defaultTaskListNavigationHandler = () => history.push(`/tasks`);

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
        if (current === selectedList.id) defaultTaskListNavigationHandler();
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
                    selected={current === defaultList.id}
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
                        selected={current === list.id}
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
                    getContentAnchorEl={null}
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
