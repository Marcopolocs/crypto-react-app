import { useCallback, useState } from 'react';

export const useAddNewAlertDialog = () => {
  const [isAddNewDialogOpen, setIsAddNewDialogOpen] = useState(false);

  const handleAddNewAlertButtonClick = useCallback(() => {
    setIsAddNewDialogOpen(true);
  }, [setIsAddNewDialogOpen]);

  const handleAddNewDialogClose = useCallback(() => {
    setIsAddNewDialogOpen(false);
  }, [setIsAddNewDialogOpen]);

  return { isAddNewDialogOpen, handleAddNewAlertButtonClick, handleAddNewDialogClose };
};
