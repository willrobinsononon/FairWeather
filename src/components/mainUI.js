import React, { useState, useEffect } from 'react';
import ScoreList from './scoreList';
import UserTeamSelect from './userTeamSelect';
import NavBar from './navBar';
import { getSeason, getRound, getStandings } from '../utilities/savedAPICalls';

export default function MainUI() {

  const [loading, setLoading] = useState(true);
  const leagueId = 39;
  const [season, setSeason] = useState(0);
  const [userTeams, setUserTeams] = useState('init');
  const [round, setRound] = useState('');
  const [teams, setTeams ] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [standings, setStandings] = useState([]);
  

  useEffect(() => {
    getSeason(leagueId).then(season => {
      setSeason(season);
      getRound(leagueId, season).then(round => setRound(round));
      getStandings(leagueId, season).then(standings => setStandings(standings)).then(() => setLoading(false));
    });
  }, []);

  if (loading) {
    return
  }
  else {
    if (userTeams === 'init') {
      return (
        <UserTeamSelect teams={ teams } setTeams={ setTeams } season={ season } leagueId={ leagueId } setUserTeams={ setUserTeams } standings={ standings }/>
      )
    }
    else {
      return (
        <div className="app-container">
          <NavBar setFixtures = { setFixtures } teams={ teams } userTeams={ userTeams } setUserTeams={ setUserTeams} round={ round } setRound={ setRound } leagueId={ leagueId } season={ season } />
          <ScoreList fixtures={ fixtures } setFixtures={ setFixtures } season={ season } leagueId={ leagueId } userTeams={ userTeams } round={ round }/>
        </div>
      )
    }
  }
}
