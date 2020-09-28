import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ElectionCard from '../components/cards/ElectionCard';
import VoteCard from '../components/cards/VoteCard';
import ResultsCard from '../components/cards/ResultsCard';

// TODO: make this reusable
const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection:' column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  }
}));

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.app}>
      <div className={classes.card}>
        <ElectionCard />
      </div>
      <div className={classes.card}>
        <VoteCard />
      </div>
      <div className={classes.card}>
        <ResultsCard />
      </div>
    </div>
  );
}