import React, { useState, useEffect } from 'react';
import ScoreList from './scoreList';
import UserTeamSelect from './userTeamSelect';
import './App.css';

function App() {

  const leagueId = 39;
  const [season, setSeason] = useState(2023);
  const [userTeams, setUserTeams] = useState('init');

  function seasonAPICall() { 
    fetch('https://v3.football.api-sports.io/leagues/?' + new URLSearchParams({
            id: leagueId,
            current: true,
        }),
        {method: 'GET',
            headers: {
                'x-apisports-key': '41f2b6b0e6b7c3ab52a65fa8a28ca222'
    }})
            .then(response => response.json())
            .then(result => {
              setSeason(result.response[0].seasons[0].year);
            }) 
  }

  function doNothing() {
    return
  }

  useEffect(() => {
    doNothing()
  }, []);

  if (userTeams === 'init') {
    return (
      <UserTeamSelect season = { season } leagueId = { leagueId } setUserTeams = { setUserTeams }/>
    )
  }
  else {
    return (
      <ScoreList season = { season } leagueId = { leagueId } userTeams = { userTeams } />
    )
  }
}

export default App;