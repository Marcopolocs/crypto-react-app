import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText } from '@mui/material';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { navigationAuthItems, navigationPageItems } from '../shared/constants/navigation-items';
import HeaderMenu from './components/HeaderMenu';
import { authActions, selectIsUserLoggedIn } from '../auth/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { APP_ROUTE_PATHS } from '../routes/app-route-paths';

const StickyHeader: React.FC = () => {
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsUserLoggedIn);
  const navigate = useNavigate();

  // TODO this needs a different approach
  const setSearchParamsForAuthPage = () => {
    setSearchParams({ action: 'login' });
  };

  const handleUserNavigationEvent = (path: string) => {
    if (path === '/logout') {
      dispatch(authActions.logout());
      navigate(APP_ROUTE_PATHS.CRYPTOCURRENCIES);
    } else {
      navigate(path);
    }
  };

  return (
    <Box className="bg-blue-darkerBlue py-3.5 px-4 border shadow-custom rounded-radius-40">
      <Container maxWidth="lg">
        <Box className="w-full flex justify-between">
          <List className="text-white flex" disablePadding>
            {navigationPageItems.map((item) => (
              <ListItem key={item.label} disablePadding className="w-auto my-0 mx-1">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `decoration-0 py-1 px-4 m-0 rounded-radius-15 ${isActive ? 'bg-grey-buttonBgGrey' : ''}`}
                >
                  <ListItemText primary={item.label} className="text-white no-underline m-0" disableTypography />
                </NavLink>
              </ListItem>
            ))}
          </List>

          <List className="w-auto py-0 px-0">
            <ListItem key={navigationAuthItems[0].label} disablePadding className="w-auto my-0 mx-0">
              <HeaderMenu isLoggedIn={isLoggedIn} navigateUserToGivenPath={handleUserNavigationEvent} />
            </ListItem>
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default StickyHeader;
