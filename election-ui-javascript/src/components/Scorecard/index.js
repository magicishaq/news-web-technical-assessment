import './Scorecard.css';
//Task 2 add winner
function Scorecard({ results, winner }) {
 
  if (!results || results.length === 0) {
    return <div>No results</div>;
  }
  
//Task 2 
  let scores = [];
  //Task 1 
  for (let i=0; i < results.length; i++) {
    scores.push(
      <tr key={i} id={parseInt(results[i].votes) === winner ? "Scorecard--winner": null} >
        <td>{results[i].party}</td>
        <td>{results[i].name}</td>
        <td>{results[i].votes}</td>
      </tr>
    )
  }

  return (
    <div className="Scorecard">
        <table className="Scorecard-table">
          <thead>
            <tr>
              <th>Party</th>
              <th>Candidate</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {scores}
          </tbody>
        </table>
    </div>
  );
}

export default Scorecard;
