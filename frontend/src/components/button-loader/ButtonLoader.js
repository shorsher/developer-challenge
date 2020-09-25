import React from 'react';
import {
  Button,
  CircularProgress,
} from '@material-ui/core';

export default function ButtonLoader({
  loading,
  isValid,
}) {
  return (
    <div>
      { !loading
        ? <Button disabled={!isValid} variant="contained" color="primary" type="submit" value="Submit">Submit</Button>
        : <CircularProgress />
      }
    </div>
  );
}