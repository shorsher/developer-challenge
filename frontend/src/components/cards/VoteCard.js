import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import icon from "../../icons/online-voting.svg";
import {
  Typography
} from '@material-ui/core';

// TODO: make this reusable
const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: '#ffff',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    width: '22vw',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
    padding: '20px',
    border: '1px solid',
  },
  logo: {
    height: '150px',
    width: '200'
  },
  voteWrapper: {
    margin: '20px',
  },
}));


export default function Election() {
  const classes = useStyles();
  let history = useHistory();

  const voteClick = () => {
    history.push('/vote');
  }

  return (
    <div className={classes.card}>
      <Typography variant="h3" component="p">
       Vote
      </Typography>
      <img src={icon} className={classes.logo} alt="logo"/>
      <div className={classes.voteWrapper}>
        <Button variant="contained" onClick={voteClick} color="primary">Vote</Button>
      </div>
      <Typography variant="body1" component="p">
        Vote for a candidate.
      </Typography>
    </div>
  );
}
