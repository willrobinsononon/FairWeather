import React, { useState, useEffect } from 'react';
import TeamPicker from './teamPicker';

export default function UserTeamSelect({ setUserTeams }) {

    const [tempUserTeams, setTempUserTeams] = useState({favourite: '', rival1: '', rival2: ''});

    const testTeamList = ['Arsenal', 'Aston Villa', 'Burnley', 'Bournemouth', 'Brighton', 'Brentford', 'Chelsea', 'Crystal Palace', 'Everton', 'Fulham', 'Luton', 'Liverpool', 'Manchester United', 'Manchester City', 'Newcastle', 'Nottingham Forest', 'Sheffield United', 'Tottenham', 'West Ham', 'Wolves'];
    
    function teamUpdater(updateKey, newValue) {
        setTempUserTeams({...tempUserTeams, [updateKey]: newValue, })
        if ( updateKey === 'rival2' ) {
            setUserTeams(tempUserTeams);
        }
    }

    if (tempUserTeams.favourite === '') {
        return (
            <TeamPicker pickerMessage = { 'Pick your favourite team '} teamList = { testTeamList } updateKey = { 'favourite' } setTeam = { teamUpdater } />
        )
    }
    else if (tempUserTeams.rival1 === '') {
        return (
            <TeamPicker pickerMessage = { 'Pick your main rival '} teamList = { testTeamList } updateKey = { 'rival1' } setTeam = { teamUpdater } />
        )
    }
    else if (tempUserTeams.rival2 === '') {
        return (
            <TeamPicker pickerMessage = { 'Pick your second rival '} teamList = { testTeamList } updateKey = { 'rival2' } setTeam = { teamUpdater } />
        )
    }
}