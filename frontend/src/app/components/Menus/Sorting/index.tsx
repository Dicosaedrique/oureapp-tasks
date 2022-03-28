import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SORT_MODE_NAMES, TaskSortMode } from 'model/Task/Sort';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSortingSlice } from 'store/slices/taskSorting';
import { selectSorting } from 'store/slices/taskSorting/selectors';
import { mapObject } from 'utils';

/**
 * Defines the menu to change sorting preferences
 */
export function SortingMenu(): React.ReactElement {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const { actions } = useSortingSlice();

    const { mode, order } = useSelector(selectSorting);

    const handleMenuItemClick = (_, mode: TaskSortMode) => {
        dispatch(actions.setSortingMode(mode));
        setAnchorEl(null);
    };

    const toggleSortingOrder = () => dispatch(actions.toggleSortingOrder());

    return (
        <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
            <Grid item>
                <Button
                    aria-controls="sorting-menu-button"
                    aria-haspopup="true"
                    onClick={handleOpen}
                >
                    <SortIcon />
                    &nbsp;{SORT_MODE_NAMES[mode]}
                    {menuOpen ? <ExpandLess /> : <ExpandMore />}
                </Button>
                <Menu
                    id="sorting-menu-selector"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {mapObject(SORT_MODE_NAMES, (value, key) => (
                        <MenuItem
                            key={key}
                            selected={key === mode}
                            onClick={event => handleMenuItemClick(event, key)}
                        >
                            {value}
                        </MenuItem>
                    ))}
                </Menu>
            </Grid>
            <Grid item>
                <Button onClick={toggleSortingOrder} aria-label="toggle sorting order">
                    Order {order ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                </Button>
            </Grid>
        </Grid>
    );
}
