import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  Button,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
}));

export default function ButtonLoader({
  loading,
  isValid,
}) {
  const classes = useStyles();
  let history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  const SubmitSection = () => {
    return  (
      <div className={classes.root}>
        <Button onClick={handleBackClick} variant="outlined">Back</Button>
        <Button disabled={!isValid} variant="contained" color="primary" type="submit" value="Submit">Submit</Button>
      </div>
    );
  };

  return (
    <div>
      { !loading
        ? <SubmitSection></SubmitSection>
        : <CircularProgress />
      }
    </div>
  );
}
