import React from 'react';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';

const GeneralTableListSkeletonLoader: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          marginTop: '3rem',
          boxShadow: '2px 1px 10px #039be5',
        }}
      >
        <Box>
          <Skeleton
            variant="rectangular"
            sx={{
              height: '55px',
              backgroundColor: '#051629',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
          />
          <Skeleton variant="rectangular" sx={{ height: '55px', backgroundColor: '#090e17' }} />
          <Skeleton variant="rectangular" sx={{ height: '55px', backgroundColor: '#051629' }} />
          <Skeleton variant="rectangular" sx={{ height: '55px', backgroundColor: '#090e17' }} />
          <Skeleton variant="rectangular" sx={{ height: '55px', backgroundColor: '#051629' }} />
          <Skeleton variant="rectangular" sx={{ height: '55px', backgroundColor: '#090e17' }} />
          <Skeleton variant="rectangular" sx={{ height: '55px', backgroundColor: '#051629' }} />
          <Skeleton
            variant="rectangular"
            sx={{ height: '52px', backgroundColor: '#090e17', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
          />
        </Box>
      </Box>
    </>
  );
};

export default GeneralTableListSkeletonLoader;
