import React from 'react';
import './Home.css';
import ElectionCard from '../components/cards/ElectionCard';
import VoteCard from '../components/cards/VoteCard';
import ResultsCard from '../components/cards/ResultsCard';

export default function Home() {

  // async function getResults() {
  //   setLoading(true);
  //   setErrorMsg(null);

  //    try {
  //      const res = await fetch(`/api/election/${contractAddress}/results`);
  //      const {results, error} = await res.json();
  //      if (!res.ok) {
  //        setErrorMsg(error);
  //      } else {
  //       console.log(results)
  //      }
  //    } catch (err) {
  //      setErrorMsg(err.stack);
  //    }
  //   setLoading(false);
  // }

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