import React from 'react';
import { useDispatch } from 'react-redux';
import AlertsList from './components/AlertsList';
import { GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const alertsColumns: GridColDef[] = [
  { field: 'id', headerName: '#' },
  { field: 'coinName', headerName: 'Name' },
  { field: 'condition', headerName: 'Condition' },
  { field: 'price', headerName: 'Price' },
  { field: 'date', headerName: 'Created at' },
  { field: 'actions', headerName: '' },
];

const rows = [
  { id: 1, coinName: 'Bitcoin', condition: 'is lower or equal', price: 50000, date: '2021-09-01' },
  { id: 2, coinName: 'Bitcoin', condition: 'is higher or equal', price: 50000, date: '2021-09-01' },
  { id: 3, coinName: 'Bitcoin', condition: 'is higher or equal', price: 50000, date: '2021-09-01' },
  { id: 4, coinName: 'Bitcoin', condition: 'is lower or equal', price: 50000, date: '2021-09-01' },
  { id: 5, coinName: 'Bitcoin', condition: 'is lower or equal', price: 50000, date: '2021-09-01' },
];

const ActiveAlertsPage: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Box className="flex justify-center flex-col items-center">
        <Typography variant="h3" className="text-white font-bold mb-4 mt-16">
          Your active alerts
        </Typography>

        <Typography variant="subtitle1" className="text-center mx-10 font-medium mb-6 text-blue-lightestBlue">
          You can see all your active alerts here. Edit their prices or delete them as you wish.
        </Typography>

        <Box className="max-w-4xl align-center m-auto mt-8">
          <AlertsList rows={rows} columns={alertsColumns} />
        </Box>
      </Box>
    </>
  );
};

export default ActiveAlertsPage;
