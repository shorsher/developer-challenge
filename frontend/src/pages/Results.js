import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {
  CircularProgress,
  Typography
} from '@material-ui/core';
import StatusAlert from '../components/status-alert/StatusAlert';
import ResultsInfo from '../components/results-info/ResultsInfo';
import icon from "../icons/elections.svg";
const axios = require('axios')

// TODO: make this reusable
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  },
  button: {
    margin: theme.spacing(1),
  }
}));

export default function Results() {
  const classes = useStyles();
  let history = useHistory();
  const { address } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultError, setResultError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const userAddress = history?.location?.state?.userAddress || "";
    const getCandidates = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:4000/api/election/results/${address}?userAddress=${userAddress}`
            );
            let data = response?.data?.results || [];
            data.sort((a,b) => b.count - a.count);
            setResults(data);
        } catch (err) {
            console.log(err);
            setResultError(true);
            setErrorMessage(err.response.data.error);
        } finally {
          setLoading(false);
        }
    };
    getCandidates();
  }, [address, history.location.state.userAddress]);

  const handleBackClick = () => {
    history.goBack();
  }

  return (
    <div className="wrapper">
      <div className={classes.card}>
        <Typography variant="h4" component="p">
          Election Results
        </Typography>
        <img src={icon} className={classes.logo} alt="logo"/>
        {!loading
          ? <ResultsInfo results={results}/>
          : <CircularProgress />
        }
        <StatusAlert
            error={resultError}
            errorMessage={errorMessage}
        >
        </StatusAlert>
        <div className={classes.button}>
          <Button
            onClick={handleBackClick}
            variant="outlined"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
