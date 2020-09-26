import React, { useState } from 'react';
import './Home.css';
import ElectionCard from '../components/cards/ElectionCard';
import VoteCard from '../components/cards/VoteCard';
import ResultsCard from '../components/cards/ResultsCard';

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [deployState, setDeployState] = useState("Deploy");
  const [contractAddress, setContractAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  async function deployContract() {
    setLoading(true);
    setErrorMsg(null);
    setDeployState("Deploying...")
    try {
      const res = await fetch('/api/election', {
        method: 'POST',
        body: JSON.stringify({
          candidateOne: "Candidate One",
          candidateTwo: "Candidate Two"
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      const {contractAddress : addr, error} = await res.json();
      if (!res.ok) {
        setErrorMsg(error)
        setDeployState("Error! - Retry Deploy");
      } else {
        setContractAddress(addr);
        setDeployState("Redeploy");
      }
    } catch (err) {
      setErrorMsg(err.stack)
      setDeployState("Error! - Retry Deploy");
    }
    setLoading(false);
  }

  async function vote(candidate) {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/election/${contractAddress}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          candidate: candidate
        })
      });
      const {error} = await res.json();
      if (!res.ok) {
        setErrorMsg(error);
      }
    } catch (err) {
      setErrorMsg(err.stack);
    }

    setLoading(false);
  }

  async function getResults() {
    setLoading(true);
    setErrorMsg(null);

     try {
       const res = await fetch(`/api/election/${contractAddress}/results`);
       const {results, error} = await res.json();
       if (!res.ok) {
         setErrorMsg(error);
       } else {
        console.log(results)
       }
     } catch (err) {
       setErrorMsg(err.stack);
     }
    setLoading(false);
  }

return (
  <div className="App">
    <div className="Card">
      <ElectionCard />
    </div>
    <div className="Card">
      <VoteCard />
    </div>
    <div className="Card">
      <ResultsCard />
    </div>
  </div>
);
}