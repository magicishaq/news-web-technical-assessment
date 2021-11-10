import React, { useState, useEffect } from "react";
import Logo from "./logo/logo";
import fetchData from "../dataFetcher";
import Scorecard from "./Scorecard";
import Votes from "../components/Votes/Votes";
import "./Scoreboard.css";

function Scoreboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [voteResults, setVoteResults] = useState(false);

  async function getData() {
    try {
      setLoading(true);
      const resultData = await fetchData();
      const resultsD = resultData.resultData.results;
      const candidateMap = resultData.candidateMap;
      //task 1
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

  useEffect(() => {
    setVoteResults({
      numberOfCurrentVotes: results.reduce((a, b) => a + parseInt(b.votes), 0),
      numberOfVotes: 20000,
      get numberOfVotesRemaining() {
        return this.numberOfVotes - this.numberOfCurrentVotes;
      },
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

      get isVotingClosed () {
        return this.numberOfCurrentVotes <= this.numberOfVotes
      }
    });
  }, [results]);

  return (
    <div className="Scoreboard">
      <header className="Election-scoreboard-header">
        <Logo language="en" />
      </header>
      <main>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          <>
            <h1>Results</h1>
            <Scorecard results={results} />
            <Votes results={results} voteResults={voteResults} />
            {voteResults.isVotingClosed ? (
              <button className="Scoreboard-refresh" onClick={getData}>
                Refresh
              </button>
            ) : <span> Voting is now closed </span> }
          </>
        )}
      </main>
    </div>
  );
}

export default Scoreboard;
