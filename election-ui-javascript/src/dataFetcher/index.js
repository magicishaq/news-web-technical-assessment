import { fetchResultData, fetchCandidateMap } from '../fakeAPI'; // Lets imagine this is an external service that we are calling via https

async function fetchResults() {
  const resultData = await fetchResultData();
  const candidateMap = fetchCandidateMap();

  return {resultData, candidateMap} ;
}

export default fetchResults;
