import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// mui
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';

const Alert = () => {
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const UI = useSelector((state) => state.UI);
  const { errors } = UI;

  useEffect(() => {
    if (errors) {
      if (Object.keys(errors).length !== 0) {
        setError(errors);
        setOpen(true);
      }
    }
  }, [errors]);

  const isEmpty = (inputObject) => {
    return Object.keys(inputObject).length === 0;
  };

  return (
    <>
      {!isEmpty(errors) ? (
        <>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={open}
            autoHideDuration={2000}
            message={error}
            onClose={() => setOpen(false)}
          />
        </>
      ) : null}
    </>
  );
};

export default Alert;
