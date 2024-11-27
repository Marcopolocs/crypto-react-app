import React from 'react';
import { InputAdornment } from '@mui/material';
import { RequestState } from '../../core/enums/request-state.enum';
import GeneralCircularProgress from './GeneralCircualProgress';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

type RequestStateIconProps = {
  requestState: RequestState;
};

export const RequestStateIconComponent: React.FC<RequestStateIconProps> = React.memo(({ requestState }) => {
  switch (requestState) {
    case RequestState.PENDING:
      return (
        <InputAdornment position="end">
          <GeneralCircularProgress color="#EF8F19" />
        </InputAdornment>
      );
    case RequestState.RESOLVED:
      return (
        <InputAdornment position="end">
          <CheckCircleSharpIcon color="success" />
        </InputAdornment>
      );
    case RequestState.REJECTED:
      return (
        <InputAdornment position="end">
          <CancelSharpIcon color="error" />
        </InputAdornment>
      );
    default:
      return null;
  }
});
