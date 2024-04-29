import React, { useState, useEffect } from 'react';
import ScoreList from './scoreList';
import UserTeamSelect from './userTeamSelect';
import NavBar from './navBar';
import { getSeason, getRound, getTeams, getStandings } from '../utilities/savedAPICalls';
import { getUserTeamsCookie } from '../utilities/cookieFunctions';

export default function MainUI() {

  const [loading, setLoading] = useState(true);
  const leagueId = 39;
  const [season, setSeason] = useState(0);
  const [userTeams, setUserTeams] = useState('init');
  const [round, setRound] = useState('');
  const [teams, setTeams ] = useState([]);
  const [standings, setStandings] = useState([]);
  

  useEffect(() => {
    getSeason(leagueId).then(season => {
      setSeason(season);
      getTeams(leagueId, season).then(teams => setTeams(teams));
      getRound(leagueId, season).then(round => setRound(round));
      getStandings(leagueId, season).then(standings => setStandings(standings)).then(() => setLoading(false));
    });

    let cookieUserTeams = getUserTeamsCookie();
    if (cookieUserTeams) {
      setUserTeams(cookieUserTeams);
    }
  }, []);

  if (loading) {
    return
  }
  else {
    if (userTeams === 'init') {
      return (
        <UserTeamSelect teams={ teams } setUserTeams={ setUserTeams } standings={ standings }/>
      )
    }
    else {
      return (
        <div className="app-container">
          <NavBar teams={ teams } userTeams={ userTeams } setUserTeams={ setUserTeams} round={ round } setRound={ setRound } leagueId={ leagueId } season={ season } />
          <ScoreList key={ round } season={ season } leagueId={ leagueId } userTeams={ userTeams } round={ round }/>
        </div>
      )
    }
  }
}
