import React from 'react'

const Votes = ({results, voteResults}) => {
//gets the highest number of votes
  //task 2a
//   const numberOfCurrentVotes = results.reduce((a,b) => a + parseInt(b.votes), 0 ); 
//   const numberOfVotes = 20000; 
//   const numberOfVotesRemaining =  numberOfVotes - numberOfCurrentVotes; 
//   const winner = results.reduce((acc, shot) => acc = acc > parseInt(shot.votes) ? acc : parseInt(shot.votes), 0);

  const votes = (
    <div className="container">
      <div className="item">
        Number of current votes : <strong>{voteResults.numberOfCurrentVotes}</strong>
      </div>
      <div className="item">
        Votes remianing : <strong>{voteResults.numberOfVotesRemaining}</strong>
      </div>
      <div className="item">
        Population size: <strong>{voteResults.numberOfVotes}</strong>
      </div>
      <div className="item">
        Current Winner : <strong> {results.find(result => parseInt(result.votes) === voteResults.winner).name } </strong>
      </div>
    </div>
  )

  return votes; 

}

export default Votes; 