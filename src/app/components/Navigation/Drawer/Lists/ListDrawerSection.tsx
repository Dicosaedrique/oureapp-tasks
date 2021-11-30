import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useArchive } from 'app/components/Archive/context';
import { ArchiveListDialog } from 'app/components/Menus/List/ArchiveListMenu';
import { CreateListMenu } from 'app/components/Menus/List/CreateListMenu';
import { DeleteListDialog } from 'app/components/Menus/List/DeleteListDialog';
import { EditListMenu } from 'app/components/Menus/List/EditListMenu';
import { ListItem } from 'app/components/Navigation/Drawer/Lists/ListItem';
import { ListOptionsMenu } from 'app/components/Navigation/Drawer/Lists/ListOptionsMenu';
import { TasksPagePathParams } from 'app/pages/TasksPage';
import { DEFAULT_LIST_ID, TaskListStats } from 'model/TaskList';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectDefaultListStat, useSmartListsSelector } from 'store/slices/taskLists/selectors';
import { Id } from 'utils/types';

interface ListsDrawerSectionProps {
    handleMobileToggle: () => void;
}

export function ListDrawerSection({
    handleMobileToggle,
}: ListsDrawerSectionProps): React.ReactElement {
    const params = useParams() as TasksPagePathParams;
    const archive = useArchive();

    const defaultList = useSelector(selectDefaultListStat);

    const lists = useSmartListsSelector(archive).filter(list => list.id !== DEFAULT_LIST_ID);

    // navigation
    const navigate = useNavigate();
    const createTaskListNavigationHandler = (id: Id) => () => {
        navigate(`/list/${archive ? 'archive/' : ''}${id}`);
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

    // archive list dialog
    const [archiveDialogOpen, setArchiveDialogOpen] = React.useState(false);
    const openArchiveDialog = () => {
        setArchiveDialogOpen(true);
        setAnchorEl(null);
    };
    const closeArchiveDialog = () => setArchiveDialogOpen(false);

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

    const isSelfSelected = params.id === selectedList?.id;
    const isDefaultListSelected = selectedList?.id === DEFAULT_LIST_ID;

    return (
        <>
            <List>
                <ListItem
                    list={defaultList}
                    archive={archive}
                    selected={params.id === defaultList.id}
                    onNavigate={defaultTaskListNavigationHandler}
                    onOptions={openOptionsCreator(defaultList)}
                    enableOptions={false}
                />

                {lists.length > 0 && <Divider sx={{ marginY: '0.5em' }} />}

                {lists.map(list => (
                    <ListItem
                        key={list.id}
                        list={list}
                        archive={archive}
                        selected={params.id === list.id}
                        onNavigate={createTaskListNavigationHandler(list.id)}
                        onOptions={openOptionsCreator(list)}
                    />
                ))}
                {!archive && (
                    <MuiListItem button onClick={openCreateMenu}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add list" />
                    </MuiListItem>
                )}
            </List>

            <CreateListMenu open={createMenuOpen} handleClose={closeCreateMenu} />

            <EditListMenu open={editMenuOpen} handleClose={closeEditListMenu} list={selectedList} />

            <DeleteListDialog
                open={deleteDialogOpen}
                handleClose={closeDeleteDialog}
                list={selectedList}
                handleSelfDelete={() => {
                    if (isSelfSelected) defaultTaskListNavigationHandler();
                }}
            />

            <ArchiveListDialog
                open={archiveDialogOpen}
                handleClose={closeArchiveDialog}
                list={selectedList}
                handleSelfArchive={() => {
                    if (isSelfSelected) defaultTaskListNavigationHandler();
                }}
                archive={archive}
            />

            <ListOptionsMenu
                archive={archive}
                anchorEl={anchorEl}
                handleClose={closeOptions}
                handleOpenEditMenu={openEditListMenu}
                handleDeleteList={!isDefaultListSelected ? openDeleteDialog : undefined}
                handleArchiveList={!isDefaultListSelected ? openArchiveDialog : undefined}
            />
        </>
    );
}

export const MemoListDrawerSection = React.memo(ListDrawerSection);
