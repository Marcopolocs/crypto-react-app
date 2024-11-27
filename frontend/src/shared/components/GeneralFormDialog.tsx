import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import React from 'react';

const CloudyBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(1px)',
}));

type generalFormDialogProps = {
  title: string;
  subtitle: string;
  isOpen: boolean;
  isLoading: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  children: React.ReactNode;
};

const GeneralFormDialog = ({ title, subtitle, isOpen, handleClose, handleSubmit, isLoading, children }: generalFormDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          backgroundColor: '#03274C',
        },
      }}
      BackdropComponent={CloudyBackdrop}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          color: '#ffffff',
          fontSize: '28px',
          justifyContent: 'center',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContentText
        sx={{
          paddingTop: 0,
          paddingX: '1.5rem',
          paddingBottom: '0.625rem',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        {subtitle}
      </DialogContentText>
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingY: '1.5rem',
          paddingX: '6rem',
          gap: '1rem',
          color: '#fff',
        }}
      >
        {children}
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          paddingY: '0.875rem',
          paddingX: 0,
        }}
      >
        <Button
          onClick={handleClose}
          variant="contained"
          sx={{
            backgroundColor: '#0B66C2',
            color: '#ffffff',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: '#0A5BAF',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          sx={{
            backgroundColor: '#EF8F19',
            borderRadius: '20px',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#C77013',
            },
          }}
          onClick={handleSubmit}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GeneralFormDialog;
