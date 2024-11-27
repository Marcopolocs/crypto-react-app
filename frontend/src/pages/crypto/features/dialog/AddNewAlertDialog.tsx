import React, { useCallback } from 'react';
import { FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCryptoNamesList } from '../../store/cryptoListSlice';
import { alertsDataActions, selectIsAddNewAlertLoading } from '../../../alerts/store/alertSlice';
import { ConditionType } from '../../../../shared/interfaces/alert-data.interface';
import { CryptoSymbol } from '../../interfaces/fetched-crypto-list.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { alertDialogDefaultValues, alertDialogFormSchema, IAlertDialogForm } from '../../constants/alert-dialog-form-schema';
import GeneralFormDialog from '../../../../shared/components/GeneralFormDialog';
import { alertDialogLabels } from '../../labels/alert-dialog-labels';
import Box from '@mui/material/Box';

const conditionLabels: Record<ConditionType, string> = {
  isLowerOrEqual: 'price is lower or equal to',
  isHigherOrEqual: 'price is higher or equal to',
  isLower: 'price is lower than',
  isHigher: 'price is higher than',
};

interface IAddNewAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewAlertDialog: React.FC<IAddNewAlertProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const isAddNewAlertLoading = useSelector(selectIsAddNewAlertLoading);
  const cryptoNamesList = useSelector(selectCryptoNamesList);

  const { handleSubmit, control, reset, setError } = useForm<IAlertDialogForm>({
    resolver: zodResolver(alertDialogFormSchema),
    defaultValues: alertDialogDefaultValues,
    mode: 'onSubmit',
  });

  const onSubmit = (newAlert: IAlertDialogForm) => {
    if (newAlert.price <= 0) {
      onInvalidFormValueSetCustomErrorForPrice(newAlert.cryptoName);
      return;
    }
    dispatch(alertsDataActions.addNewUserAlert({ newAlert }));
    reset(alertDialogDefaultValues);
    onClose();
  };

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const onInvalidFormValueSetCustomErrorForPrice = (cryptoName: CryptoSymbol) => {
    setError('price', {
      type: 'manual',
      message: `The price for ${cryptoName} needs to be added!`,
    });
  };

  return (
    <GeneralFormDialog
      title={alertDialogLabels.title}
      subtitle={alertDialogLabels.subtitle}
      isOpen={isOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
      isLoading={isAddNewAlertLoading}
    >
      <Box>
        <Typography variant="body1">Cryptocurrency</Typography>

        <Controller
          control={control}
          name="cryptoName"
          render={({ field, fieldState: { error, invalid } }) => (
            <FormControl fullWidth>
              <Select {...field} error={invalid} fullWidth sx={{ backgroundColor: '#fff' }}>
                {cryptoNamesList.map(({ cryptoName, cryptoSymbol }) => (
                  <MenuItem key={cryptoSymbol} value={cryptoSymbol}>
                    {cryptoName} ({cryptoSymbol})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Box>

      <Box>
        <Typography variant="body1" className="text-white">
          Condition
        </Typography>
        <Controller
          control={control}
          name="condition"
          render={({ field, fieldState: { invalid } }) => (
            <FormControl fullWidth>
              <Select error={invalid} {...field} fullWidth sx={{ backgroundColor: '#fff' }}>
                {Object.keys(conditionLabels).map((key) => (
                  <MenuItem key={key} value={key}>
                    {conditionLabels[key as ConditionType]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Box>

      <Box>
        <Typography variant="body1" className="text-white">
          Price
        </Typography>
        <Controller
          control={control}
          name="price"
          render={({ field, fieldState: { error, invalid } }) => (
            <FormControl fullWidth>
              <TextField
                type="number"
                {...field}
                error={invalid}
                helperText={error?.message}
                variant="outlined"
                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
              />
            </FormControl>
          )}
        />
      </Box>
    </GeneralFormDialog>
  );
};

export default AddNewAlertDialog;
