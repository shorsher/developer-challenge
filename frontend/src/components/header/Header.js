import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from './logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#3942C1'
  },
  appBar: {
    backgroundColor: 'white',
  },
  logo: {
    height: '35px',
    marginRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <img src={logo} className={classes.logo} alt="logo"/>
          <Typography variant="h5" className={classes.title}>
            KaleidElect
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}