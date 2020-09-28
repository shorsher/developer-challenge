import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// TODO: make this reusable
const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: '#ffff',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    width: '450px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0px 20px 0px 20px',
    padding: '20px',
    border: '2px solid',
    borderColor: "#CCCCCC"
  },
    selectedCard: {
    backgroundColor: '#ffff',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    width: '450px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0px 20px 0px 20px',
    padding: '20px',
    border: '2px solid',
    borderColor: '#3942C1'
  },
}));

export default function CandidateSelect({
	candidate,
	candidateSelect,
	haveSelectedBorder,
}) {
  const classes = useStyles();

  return (
	<div
		onClick={() => {candidateSelect(candidate)}}
		className={haveSelectedBorder(candidate) ? classes.selectedCard : classes.card}
	>
	  <Typography variant="h3" component="p">
		  {candidate.name}
	  </Typography>
	  <Typography variant="body1" component="p">
		  {candidate.platform}
	  </Typography>
	</div>
  );
}
