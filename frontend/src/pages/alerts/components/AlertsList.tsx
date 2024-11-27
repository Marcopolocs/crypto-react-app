import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

interface IAlertsListProps {
  rows: any[];
  columns: any[];
}

const AlertsList: React.FC<IAlertsListProps> = ({ rows, columns }) => {
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        className="text-white bg-blue-darkerBlue border-0 shadow-custom"
        getCellClassName={(params) => (params.value >= 0 ? '' : '')}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        sx={{
          '& .even': {
            backgroundColor: '#051629',
            color: 'white',
            '&:hover': {
              backgroundColor: '#09203A',
            },
          },
          '& .odd': {
            backgroundColor: '#090E17',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0D121C',
            },
          },
          '& .MuiDataGrid-container--top [role=row]': {
            backgroundColor: '#C77013',
            color: 'white',
            fontWeight: 700,
          },
        }}
      />
    </>
  );
};

export default AlertsList;
