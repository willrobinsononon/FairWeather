import React, { useState, useEffect } from 'react';
import ScoreList from './scoreList';
import UserTeamSelect from './userTeamSelect';
import './App.css';

function App() {

  const [userTeams, setUserTeams] = useState('init');

  if (userTeams === 'init') {
    return (
      <UserTeamSelect setUserTeams = { setUserTeams }/>
    )
  }
  else {
    return (
      <ScoreList userTeams = { userTeams } />
    )
  }
}

export default App;