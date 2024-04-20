import React, { useState, useEffect } from 'react';
import ScoreList from './scoreList'
import TeamPicker from './teamPicker'
import './App.css';

function App() {

  const [appState, setAppState] = useState('init');
  const [userTeams, setUserTeams] = useState({favourite: '', rival1: '', rival2: ''})

  if (appState === 'init') {
    return (
      <TeamPicker pickerMessage = { 'Pick your favourite team '} teamList = {['Arsenal', 'Aston Villa', 'Burnley', 'Bournemouth', 'Brighton', 'Brentford', 'Chelsea', 'Crystal Palace', 'Everton', 'Fulham', 'Luton', 'Liverpool', 'Manchester United', 'Manchester City', 'Newcastle', 'Nottingham Forest', 'Sheffield United', 'Tottenham', 'West Ham', 'Wolves']} />
    )
  }
  else {
    return (
      <ScoreList />
    )
  }
}

export default App;