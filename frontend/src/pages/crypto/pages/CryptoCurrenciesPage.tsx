import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Portal } from '@mui/material';
import CryptoList from '../components/CryptoList';
import { useDispatch, useSelector } from 'react-redux';
import { cryptoDataActions, selectCryptoList, selectIsFetchCryptoListLoading } from '../store/cryptoListSlice';
import AddNewAlertDialog from '../features/dialog/AddNewAlertDialog';
import { useAddNewAlertDialog } from '../hooks/useAddNewAlertDialogHook';
import GeneralTableListSkeletonLoader from '../../../shared/components/GeneralTableListSkeletonLoader';
import useGeneralNotificationSnackbar from '../../../shared/hooks/useGeneralNotificationSnackbar';

const CryptoCurrenciesPage: React.FC = () => {
  const dispatch = useDispatch();
  const cryptoList = useSelector(selectCryptoList);
  const isCryptoListLoading = useSelector(selectIsFetchCryptoListLoading);
  const { handleAddNewDialogClose, handleAddNewAlertButtonClick, isAddNewDialogOpen } = useAddNewAlertDialog();
  const { handleOpenSnackbarEvent } = useGeneralNotificationSnackbar();

  useEffect(() => {
    dispatch(cryptoDataActions.fetchCryptoList());
    handleOpenSnackbarEvent();
  }, [dispatch, handleOpenSnackbarEvent]);

  // TODO title box to be in its own component to be more reusable
  return (
    <>
      <Portal>
        {isAddNewDialogOpen && <AddNewAlertDialog isOpen={isAddNewDialogOpen} onClose={handleAddNewDialogClose}></AddNewAlertDialog>}
      </Portal>

      <Box className="flex flex-col items-center">
        <Typography variant="h3" className="text-white font-bold mb-4 mt-16">
          Today's <span>Cryptocurrency</span> Prices
        </Typography>
        <Typography variant="subtitle1" className="text-center mx-10 font-medium mb-6 text-blue-lightestBlue">
          Explore all the world-renowned Cryptocurrencies and be up-to-date with their prices at all hours every day by setting alerts!
        </Typography>
        <Button
          className="font-semibold py-2.5 px-4 mt-4 bg-blue-lighterBlue text-white rounded-radius-40"
          type="submit"
          variant="outlined"
          onClick={handleAddNewAlertButtonClick}
        >
          Set an alert
        </Button>
      </Box>
      {isCryptoListLoading ? <GeneralTableListSkeletonLoader /> : <CryptoList cryptoList={cryptoList} />}
    </>
  );
};

export default CryptoCurrenciesPage;
