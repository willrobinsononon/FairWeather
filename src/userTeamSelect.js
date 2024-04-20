import React, { useState, useEffect } from 'react';
import TeamPicker from './teamPicker';

export default function UserTeamSelect({ season, leagueId, setUserTeams }) {

    const [tempUserTeams, setTempUserTeams] = useState({favourite: '', rival1: '', rival2: ''});
    const [ teams, setTeams ] = useState([]);

    function teamsSavedData() {
        fetch("/testTeams.txt")
        .then((res) => res.text())
        .then((text) => {
            setTeams(JSON.parse(text));
        })          
    };

    function teamsAPICall() {
        fetch('https://v3.football.api-sports.io/teams/?' + new URLSearchParams({
            league: leagueId,
            season: season,
        }),
        {
            method: 'GET',
            headers: {
                'x-apisports-key': '41f2b6b0e6b7c3ab52a65fa8a28ca222'
            }
        })
            .then(response => response.json())
            .then(result => {
                setTeams(result.response)
            }) 
    }

    useEffect(() => {
        teamsSavedData()
      }, []);

    function teamUpdater(updateKey, newTeamId) {
        var newValue = {}
        for (let key in teams) {
            if (teams[key].team.id === Number(newTeamId)) {
                newValue = teams[key].team;
            }
        }
        if ( updateKey === 'rival2' ) {
            setUserTeams({...tempUserTeams, [updateKey]: newValue, });
        }
        else {
            setTempUserTeams({...tempUserTeams, [updateKey]: newValue, })
        }
    }

    if (tempUserTeams.favourite === '') {
        return (
            <TeamPicker pickerMessage = { 'Pick your favourite team '} teamList = { teams } updateKey = { 'favourite' } setTeam = { teamUpdater } />
        )
    }
    else if (tempUserTeams.rival1 === '') {
        return (
            <TeamPicker pickerMessage = { 'Pick your main rival '} teamList = { teams } updateKey = { 'rival1' } setTeam = { teamUpdater } />
        )
    }
    else if (tempUserTeams.rival2 === '') {
        return (
            <TeamPicker pickerMessage = { 'Pick your second rival '} teamList = { teams } updateKey = { 'rival2' } setTeam = { teamUpdater } />
        )
    }
}