import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import icon from "../../icons/candidate.svg";

// TODO: make this reusable
const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: '#ffff',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    height: '300px',
    width: '600px',
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
  button: {
    margin: '20px',
  },
}));

export default function Election() {
  const classes = useStyles();
  let history = useHistory();

  const registerClick = () => {
    history.push('/register');
  }

  return (
    <div className={classes.card}>
      <Typography variant="h3" component="p">
        Register Candidates
      </Typography>
      <img src={icon} className={classes.logo} alt="logo"/>
      <div className={classes.button}>
        <Button variant="contained" onClick={registerClick} color="primary">Register</Button>
      </div>
      <Typography variant="body1" component="p">
        Begin an election by adding candidates.
      </Typography>
    </div>
  );
}
