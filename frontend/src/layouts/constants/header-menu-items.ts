import React from 'react';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';

export const loggedInHeaderMenuItems: { label: string; path: string; svgIcon: React.ElementType }[] = [
  { label: 'Profile', path: '/profile', svgIcon: AccountCircleSharpIcon },
  { label: 'Logout', path: '/logout', svgIcon: LogoutSharpIcon },
];
