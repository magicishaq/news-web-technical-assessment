import React from 'react'
import './Votes.css'

//Task 2 

const Votes = ({results, voteResults}) => {
  const votes = (
    <div className="container">
      <div className="item">
        Number of current votes : <strong>{voteResults.numberOfCurrentVotes}</strong>
      </div>
      <div className="item">
        Current Winner : <strong> {results.find(result => parseInt(result.votes) === voteResults.winner).name } </strong>
      </div>
    </div>
  )

  return votes; 

}

export default Votes; 