import React from 'react';
import {
  Typography
} from '@material-ui/core'

export default function ResultsInfo({
    results
}) {
  return (
    <div>
      {results.map((candidate, index) =>
        <Typography>
          {index + 1}. {candidate.name}: {candidate.count} votes
        </Typography>
      )}
    </div>
  );
}
