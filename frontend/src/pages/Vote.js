import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CandidateSelect from '../components/cards/CandidateSelect';
import ButtonLoader from '../components/button-loader/ButtonLoader';
import { Typography, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
const axios = require('axios');

// TODO: make this reusable
const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    card: {
      backgroundColor: '#ffff',
      borderRadius: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid',
      padding: '20px',
      margin: '40px',
    },
    candidateWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
}));

export default function Vote() {
    const classes = useStyles();
    const { address } = useParams();
    const [candidates, setCandidates] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userAddress, setUserAddress] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState({});

    const candidateSelect = (candidate) => {
        setSelectedCandidate(candidate);
    }

    const haveSelectedBorder = (candidate) => {
        return candidate.index === selectedCandidate.index;
    }

    const isValid = () => {
        if ((Object.keys(selectedCandidate).length !== 0) && userAddress !== null) {
            return true;
        }
        return false;
    }

    const submitVote = async (event) => {
        try {
            setLoading(true);
            event.preventDefault();

            const payload = {
                contractAddress: address,
                userAddress: userAddress,
                candidate: selectedCandidate.index
            };

            const response = await axios.post(
                'http://localhost:4000/api/election/vote',
                payload
            );
            setLoading(false);
            setSubmitSuccess(true);
        } catch (err) {
            console.log(err);
            setLoading(false);
            setSubmitError(true);
        }
    }

    const handleUserInput = (event) => {
        setUserAddress(event.target.value);
    };

    const submitAlert = () => {
        if (submitSuccess) {
            return(
                <div className="half-margin-top">
                <Alert severity="success">Success!</Alert>
                </div>
            )
        } else if (submitError) {
        return(
            <div className="half-margin-top">
            <Alert severity="error">Error submitting vote!</Alert>
            </div>
        )
        } else {
            return null;
        }
    }

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/election/candidates/${address}`
                );
                setCandidates(response.data.candidates);
            } catch (err) {
                console.log(err);
            }
        };
        getCandidates();
    }, [address]);

    return (
        <form className={classes.wrapper} onSubmit={submitVote}>
            <div className= {classes.card}>
                <Typography variant="h3" component="p">
                    Vote
                </Typography>
                <Typography variant="h6" component="p">
                    Select a Candidate from the choices below:
                </Typography>
                <div className={classes.candidateWrapper}>
                    {candidates.map(candidate => (
                        <CandidateSelect
                            key={candidate._id}
                            candidate={candidate}
                            candidateSelect={candidateSelect}
                            haveSelectedBorder={haveSelectedBorder}
                        ></CandidateSelect>
                    ))}
                </div>
                <TextField
                    id="outlined-basic"
                    required
                    label="User address"
                    variant="outlined"
                    margin="normal"
                    onChange={handleUserInput}
                />
                <ButtonLoader
                    isValid={isValid()}
                    loading={loading}
                />
                <div className="half-margin-top">
                    {submitAlert()}
                </div>
            </div>
        </form>
    );
}