import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import icon from "../../icons/online-voting.svg";
import {
  TextField,
  Typography
} from '@material-ui/core';

// TODO: make this reusable
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  card: {
    backgroundColor: '#ffff',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    width: '450px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
    padding: '20px',
    border: '1px solid',
  },
  logo: {
    height: '150px',
    width: '200',
    marginBottom: '20px'
  },
  button: {
    '& > *': {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
  },
  formWrapper: {
    marginTop: '20px',
  }
}));

export default function ElectionSearch() {
  const [ballotAddress, setBallotAddress] = useState(null);
  const classes = useStyles();
  let history = useHistory();

  const electionSearch = () => {
    history.push(`/vote/${ballotAddress}`);
  }

  const handleInput = (event) => {
    setBallotAddress(event.target.value);
  }

  const handleBackClick = () => {
    history.goBack();
  }

  return (
    <div className="wrapper">
      <div className={classes.card}>
        <Typography variant="h3" component="p">
          Election Search
        </Typography>
        <img src={icon} className={classes.logo} alt="logo"/>
        <TextField
          id="outlined-basic"
          required
          label="Ballot address"
          variant="outlined"
          onChange={handleInput}
        />
        <div className={classes.button}>
          <Button
            variant="outlined"
            onClick={handleBackClick}
            color="primary"
          >
            Back
          </Button>
          <Button
            disabled={!ballotAddress}
            variant="contained"
            onClick={electionSearch}
            color="primary"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
