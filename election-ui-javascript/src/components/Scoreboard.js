
//task 2 
import React, { useState, useEffect } from "react";
import Logo from "./logo/logo";
import fetchData from "../dataFetcher";
import Scorecard from "./Scorecard";
import Votes from "../components/Votes/Votes";
import "./Scoreboard.css";
import Loading from '../components/Loading/Loading'
import usePrevious from "../hooks/usePrevious";

function Scoreboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]); 
  //Task 2 
  const [showRefresh, setshowRefresh] = useState(true); 
  //Task 2 
  const [voteResults, setVoteResults] = useState(false);
  const previous = usePrevious(voteResults); 

  function logState () {
    console.log(previous, 'previous')
    console.log(voteResults, 'voteResults' )
    if(previous.numberOfCurrentVotes === voteResults.numberOfCurrentVotes){
      setshowRefresh(false)
    }
  }

  async function getData() {
    try {
      setLoading(true);
      //Task 1
      const resultData = await fetchData();
      const resultsD = resultData.resultData.results;
      const candidateMap = resultData.candidateMap;
      const modifiedData = resultsD.map((item, index) => {
        if (item.candidateId === candidateMap[index].id) {
          item.name = candidateMap[index].name;
        }
        return item;
      });

      setResults(modifiedData);
      setLoading(false);
      return modifiedData;
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);
//Task 2 
//second use effect, this time watches results 
//has computed propetries to calcuate the number of votes
  useEffect(() => {
    setVoteResults({
      numberOfCurrentVotes: results.reduce((a, b) => a + parseInt(b.votes), 0),
      get winner() {
        return results.reduce(
          (acc, shot) =>
            (acc = acc > parseInt(shot.votes) ? acc : parseInt(shot.votes)),
          0
        );
      },
      get winnerPerson() {
        return results.find((result) => parseInt(result.votes) === this.winner);
      },
    });
  }, [results]);

  return (
    <div className="Scoreboard">
      <header className="Election-scoreboard-header">
        <Logo language="en" />
      </header>
      <main>
        {loading ? (
         <Loading /> 
        ) : error ? (
          <h1>Error</h1>
        ) : (
          <>
            <h1>Results</h1>
            <Scorecard results={results} winner={voteResults.winner} />
            <Votes results={results} voteResults={voteResults} />
            {showRefresh ? (
              //Task 3 
              <button className="Scoreboard-refresh" onClick={() => {getData(); logState() }}>
                Refresh
              </button>
            ) : <span> Voting is now Complete </span> }
          </>
        )}
      </main>
    </div>
  );
}

export default Scoreboard;
