import React, { useState, useEffect } from 'react';
import ScoreList from './scoreList';
import UserTeamSelect from './userTeamSelect';
import NavBar from './navBar';
import { getInitialData } from '../utilities/APICalls';
import { getSavedInitialData } from '../utilities/savedAPICalls';
import { getUserTeamsCookie, getUseSavedDataCookie, setUseSavedDataCookie } from '../utilities/cookieFunctions';

export default function MainUI() {

  const [loading, setLoading] = useState(true);
  const [seasonData, setSeasonData] = useState({leagueId: 39});
  const [userTeams, setUserTeams] = useState('init');
  const [useSavedData, setUseSavedData] = useState(false);
  

  useEffect(() => {

    let cookieUseSavedData = getUseSavedDataCookie();
    if (cookieUseSavedData) {
      setUseSavedData(true);
    }

    if (window.location.pathname !== "") {
      const splitPath = window.location.pathname.split('/');
      if (splitPath[1] === 'round' ) {
        var pathRound = Number(splitPath[2]);
        if (isNaN(pathRound)) {
          pathRound = false;
        }
      }
    }

    window.addEventListener('popstate', (event) => setSeasonData(event.state))
    
    if (cookieUseSavedData) {
      getSavedInitialData().then((initialData) => {
        if (pathRound && pathRound > 0 && pathRound < (initialData.teams.length - 1) * 2) {
          setSeasonData({...seasonData, ...initialData, round: {...initialData.round, offset: pathRound - initialData.round.currentRound}});
          //window.history.pushState({...seasonData, ...initialData, round: {...initialData.round, offset: pathRound - initialData.round.currentRound}}, '', `/FairWeather/round/${pathRound}`);
        }
        else {
          setSeasonData({...seasonData, ...initialData});
          //window.history.pushState({...seasonData, ...initialData}, '', `/FairWeather/round/${initialData.round.currentRound + initialData.round.offset}`);
        }
        setLoading(false);
      });
    }
    else {
      getInitialData(seasonData.leagueId).then((initialData) => {
        if (initialData === 'rateLimit') {
          alert("We've hit the rate limit for the API, please wait a minute and reload the page.");
          return
        }
        else if (initialData === 'requests') {
          alert("We've reached the daily request limit for the API, switching to saved test data.");
          setUseSavedData(true);
          setUseSavedDataCookie(true);
          getSavedInitialData().then((initialData) => {
            if (pathRound && pathRound > 0 && pathRound < (initialData.teams.length - 1) * 2) {
              setSeasonData({...seasonData, ...initialData, round: {...initialData.round, offset: pathRound - initialData.round.currentRound}});
              //window.history.pushState({...seasonData, ...initialData, round: {...initialData.round, offset: pathRound - initialData.round.currentRound}}, '', `/FairWeather/round/${pathRound}`);
            }
            else {
              setSeasonData({...seasonData, ...initialData});
              //window.history.pushState({...seasonData, ...initialData}, '', `/FairWeather/round/${initialData.round.currentRound + initialData.round.offset}`);
            }
            setLoading(false);
          });
        }
        else {
          if (pathRound && pathRound > 0 && pathRound < (initialData.teams.length - 1) * 2) {
            setSeasonData({...seasonData, ...initialData, round: {...initialData.round, offset: pathRound - initialData.round.currentRound}});
            //window.history.pushState({...seasonData, ...initialData, round: {...initialData.round, offset: pathRound - initialData.round.currentRound}}, '', `/FairWeather/round/${pathRound}`);
          }
          else {
            setSeasonData({...seasonData, ...initialData});
            //window.history.pushState({...seasonData, ...initialData}, '', `/FairWeather/round/${initialData.round.currentRound + initialData.round.offset}`);
          }
          setLoading(false);
        }
      });
    }  

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
        <UserTeamSelect seasonData={ seasonData } setUserTeams={ setUserTeams } />
      )
    }
    else {
      return (
        <div className="app-container">
          <NavBar setUserTeams={ setUserTeams} seasonData={ seasonData } setSeasonData={ setSeasonData } />
          <ScoreList key={ seasonData.round } seasonData={ seasonData } userTeams={ userTeams } useSavedData={ useSavedData } setUseSavedData={ setUseSavedData } />
        </div>
      )
    }
  }
}
