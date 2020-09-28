import React from 'react';
import './Home.css';
import ElectionCard from '../components/cards/ElectionCard';
import VoteCard from '../components/cards/VoteCard';
import ResultsCard from '../components/cards/ResultsCard';

export default function Home() {

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