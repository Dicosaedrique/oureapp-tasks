import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MenuItem } from '@mui/material';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import { CreateListMenu } from 'app/components/Menus/List/CreateListMenu';
import { DeleteListDialog } from 'app/components/Menus/List/DeleteListDialog';
import { EditListMenu } from 'app/components/Menus/List/EditListMenu';
import { TasksPagePathParams } from 'app/pages/TasksPage';
import { DEFAULT_LIST_ID, TaskListStats } from 'model/TaskList';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    selectDefaultTaskListBase,
    selectTaskListsBaseOrderedByCreationDate,
} from 'store/slices/taskLists/selectors';
import { Id } from 'utils/types';

interface ListsDrawerSectionProps {
    handleMobileToggle: () => void;
}

export function ListDrawerSection({
    handleMobileToggle,
}: ListsDrawerSectionProps): React.ReactElement {
    const params = useParams() as TasksPagePathParams;

    const defaultList = useSelector(selectDefaultTaskListBase);

    const lists = useSelector(selectTaskListsBaseOrderedByCreationDate).filter(
        list => list.id !== DEFAULT_LIST_ID,
    );

    // navigation
    const navigate = useNavigate();
    const createTaskListNavigationHandler = (id: Id) => () => {
        navigate(`/list/${id}`);
        handleMobileToggle(); // close drawer on navigate (on mobile)
    };
    const defaultTaskListNavigationHandler = createTaskListNavigationHandler(DEFAULT_LIST_ID);

    const [selectedList, setSelectedList] = React.useState<TaskListStats | null>(null);

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

    // delete list dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const openDeleteDialog = () => {
        setDeleteDialogOpen(true);
        setAnchorEl(null);
    };
    const closeDeleteDialog = () => setDeleteDialogOpen(false);

    // options menu
    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
    const openOptionsCreator = (list: TaskListStats) => (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setSelectedList(list);
    };
    const closeOptions = () => {
        setAnchorEl(null);
        setSelectedList(null);
    };

    return (
        <>
            <List>
                <ListItem
                    list={defaultList}
                    selected={params.id === defaultList.id}
                    onNavigate={defaultTaskListNavigationHandler}
                    onOptions={openOptionsCreator(defaultList)}
                />

                <Divider sx={{ marginY: '0.5em' }} />

                {lists.map(list => (
                    <ListItem
                        key={list.id}
                        list={list}
                        selected={params.id === list.id}
                        onNavigate={createTaskListNavigationHandler(list.id)}
                        onOptions={openOptionsCreator(list)}
                    />
                ))}
                <MuiListItem button onClick={openCreateMenu}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add list" />
                </MuiListItem>
            </List>

            <CreateListMenu open={createMenuOpen} handleClose={closeCreateMenu} />
            <EditListMenu open={editMenuOpen} handleClose={closeEditListMenu} list={selectedList} />
            <DeleteListDialog
                open={deleteDialogOpen}
                handleClose={closeDeleteDialog}
                list={selectedList}
                handleSelfDelete={() => {
                    if (params.id === selectedList?.id) defaultTaskListNavigationHandler();
                }}
            />

            <ListOptionsMenu
                anchorEl={anchorEl}
                disableDelete={selectedList?.id === DEFAULT_LIST_ID}
                handleClose={closeOptions}
                handleOpenEditMenu={openEditListMenu}
                handleDeleteList={openDeleteDialog}
            />
        </>
    );
}

export const MemoListDrawerSection = React.memo(ListDrawerSection);

interface ListItemProps {
    list: TaskListStats;
    selected: boolean;
    onNavigate: () => void;
    onOptions: (event: React.MouseEvent<HTMLElement>) => void;
}

function ListItem({ list, selected, onNavigate, onOptions }: ListItemProps) {
    return (
        <MuiListItem button selected={selected} onClick={onNavigate}>
            <ListItemIcon>
                <ListIcon />
            </ListItemIcon>
            <ListItemText
                primary={
                    <span>
                        {list.title}{' '}
                        <Badge
                            badgeContent={list.taskToDoCount}
                            sx={{ ml: 2, '& .MuiBadge-badge': { bgcolor: 'text.disabled' } }}
                            color="primary"
                        />
                    </span>
                }
            />

            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    onClick={onOptions}
                    aria-label="Options"
                    title="Options"
                    size="large"
                >
                    <MoreVertIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </MuiListItem>
    );
}

interface ListOptionsMenuProps {
    anchorEl: Element | null;
    handleClose: () => void;
    handleOpenEditMenu: () => void;
    handleDeleteList: () => void;
    disableDelete?: boolean;
}

function ListOptionsMenu({
    anchorEl,
    handleClose,
    handleOpenEditMenu,
    handleDeleteList,
    disableDelete = false,
}: ListOptionsMenuProps): React.ReactElement | null {
    const open = Boolean(anchorEl);

    if (!open) return null;

    return (
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <MenuItem onClick={handleOpenEditMenu} style={{ color: '#4e58ee' }}>
                <EditIcon />
                &nbsp;&nbsp;Edit List
            </MenuItem>
            {!disableDelete && (
                <MenuItem onClick={handleDeleteList} style={{ color: 'red' }}>
                    <DeleteIcon />
                    &nbsp;&nbsp;Delete list
                </MenuItem>
            )}
        </Menu>
    );
}
