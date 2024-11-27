import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React from 'react';
import StickyHeader from './StickyHeader';

const RootLayout: React.FC = () => {
  return (
    <>
      <Container className="bg-blue-mainBgBlue px-8 lg:px-36 xl:px-96 max-w-full py-6 min-h-screen">
        <StickyHeader />
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
