import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import React from 'react';

interface Props<Type> {
    id: string;
    title: string;
    value: Type;
    onChange: (value: Type) => void;
    values: [name: string, value: Type][];
}

/**
 * Defines a component that create a menu with radio groupe to choose a value
 */
export function RadioMenuPicker<Type>({
    id,
    title,
    value,
    onChange,
    values,
}: Props<Type>): React.ReactElement {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button aria-controls={id} aria-haspopup="true" onClick={handleOpen}>
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
                {values.map(([name, val]) => (
                    <MenuItem
                        key={name}
                        onClick={() => {
                            handleClose();
                            onChange(val);
                        }}
                    >
                        <Radio checked={value === val} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
