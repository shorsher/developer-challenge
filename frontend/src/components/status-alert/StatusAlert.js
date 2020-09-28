import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab'


export default function StatusAlert({
    success,
    error,
    errorMessage,
}) {
  if (success) {
    return(
      <Alert severity="success">Success!</Alert>
    );
  } else if (error) {
    return(
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {errorMessage}
      </Alert>
    );
  } else {
    return null;
  }
}
