import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import React, { useState } from 'react';
import { loggedInHeaderMenuItemStyling } from '../constants/layout-styles';
import { loggedInHeaderMenuItems } from '../constants/header-menu-items';
import { navigationAuthItems } from '../../shared/constants/navigation-items';

interface IHeaderProps {
  isLoggedIn: boolean;
  navigateUserToGivenPath: (path: string) => void;
}

const HeaderMenu: React.FC<IHeaderProps> = ({ isLoggedIn, navigateUserToGivenPath }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleHeaderNavigation = (path: string) => {
    navigateUserToGivenPath(path);
    handleCloseMenu();
  };

  return (
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onMouseEnter={handleOpenMenu} className="p-0">
        <AccountCircleSharpIcon className="text-white text-5xl" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              padding: isLoggedIn ? '0px' : '20px 30px',
              backgroundColor: '#192738',
              boxShadow: '0px 3px 10px #2f3e50 !important',
              border: '1px solid #2f3e50',
              borderRadius: isLoggedIn ? '10px' : '5px',
            },
            onMouseLeave: handleCloseMenu,
          },
        }}
      >
        {isLoggedIn ? (
          loggedInHeaderMenuItems.map((item) => (
            <MenuItem key={item.label} onClick={() => handleHeaderNavigation(item.path)} sx={loggedInHeaderMenuItemStyling}>
              <item.svgIcon sx={{ fontSize: '40px', paddingRight: '10px' }} />
              {item.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem
            onClick={() => handleHeaderNavigation(navigationAuthItems[0].path)}
            sx={{
              color: '#ffffff',
              padding: '6px 60px',
              backgroundColor: '#EF8F19',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: '#C77013',
              },
              '&:active': {
                backgroundColor: '#EF8F19',
              },
              fontWeight: '600',
            }}
          >
            Login
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default HeaderMenu;
