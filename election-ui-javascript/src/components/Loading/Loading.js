import React from 'react'

//Task 3 
const Loading = () => {
   return( <>
    <h1> Results </h1>
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
            </tbody>
          </table>
      </div>
          <pre>Loading.... </pre>
      </>)
}

export default Loading