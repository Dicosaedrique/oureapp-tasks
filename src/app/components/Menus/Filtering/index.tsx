import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

import { TaskLimitDateFilterComponent } from './TaskLimitDateFilter';
import { TaskPriorityFilterComponent } from './TaskPriorityFilter';
import { TaskStateFilterComponent } from './TaskStateFilter';

/**
 * Defines the menu to change filtering preferences
 */
export function FilteringMenu(): React.ReactElement {
    return (
        <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
            <Grid item>
                <TaskStateFilterComponent />
            </Grid>
            <Grid item>
                <TaskPriorityFilterComponent />
            </Grid>
            <Grid item>
                <TaskLimitDateFilterComponent />
            </Grid>
        </Grid>
    );
}

export type FilterItems<Type> = [name: string, value: Type][];

/**
 * Defines the props for a generic filter component
 */
interface GenericFilterProps<Type> {
    id: string;
    title: string;
    onItemClick: (value: Type) => void; // when clicking on an item
    items: FilterItems<Type>; // items displayed in the menu (diplayable name and real value)
    values: Type[]; // values that are checked in the filter
    onAllClick?: () => void; // callback when user click on "all" item (if undefined, "all" item won't be displayed)
    allTitle?: string; // optionnal name of the "all" item (displayed before any other item)
}

/**
 * Defines a reusable filter component (see the props for further understanding)
 */
export function GenericFilterComponent<Type>({
    id,
    title,
    items,
    values,
    onItemClick,
    allTitle = 'All',
    onAllClick,
}: GenericFilterProps<Type>): React.ReactElement {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // checbox state
    const checked = values.length === 0;
    const indeterminate = !checked && values.length < items.length;

    return (
        <>
            <Button aria-controls={id} aria-haspopup="true" onClick={handleOpen}>
                <FilterListIcon />
                &nbsp;
                {title}
                {menuOpen ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Menu
                id={id}
                anchorEl={anchorEl}
                keepMounted
                open={menuOpen}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 288,
                    },
                }}
            >
                {onAllClick !== undefined && (
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            if (!checked) onAllClick();
                        }}
                    >
                        <Checkbox
                            checked={checked}
                            indeterminate={indeterminate}
                            disabled={checked}
                        />
                        <ListItemText primary={allTitle} />
                    </MenuItem>
                )}
                {items.map(([name, value]) => (
                    <MenuItem
                        key={name}
                        onClick={() => {
                            handleClose();
                            onItemClick(value);
                        }}
                    >
                        <Checkbox checked={values.length === 0 || values.indexOf(value) === -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
