import React, { useState, useEffect } from 'react';
import TeamPicker from './teamPicker';
import { setUserTeamsCookie } from '../utilities/cookieFunctions'

export default function UserTeamSelect({ teams, setUserTeams, standings }) {

    const [tempUserTeams, setTempUserTeams] = useState({favourite: false, rival1: false, rival2: false});

    function teamUpdater(updateKey, newTeamId) {
        newTeamId = Number(newTeamId);
        for (let key in teams) {
            if (teams[key].team.id === newTeamId) {
                var newValue = teams[key];
            };
        }
        if ( updateKey === 'rival2' && tempUserTeams.favourite && tempUserTeams.rival1 ) {
            
            let favouriteIndex = standings.findIndex((team) => team.team.id === tempUserTeams.favourite.team.id);
            let rivalBelow = teams.find(team => team.team.id === standings[favouriteIndex + 1].team.id);
            let rivalAbove = teams.find(team => team.team.id === standings[favouriteIndex - 1].team.id);

            if (favouriteIndex <= (standings.length / 2)) {
                var rivals = [tempUserTeams.rival1, newValue, rivalAbove, rivalBelow];
                
            }
            else {
                var rivals = [tempUserTeams.rival1, newValue, rivalBelow, rivalAbove];
            }
            var newUserTeams = {
                favourite: tempUserTeams.favourite, 
                rivals: rivals
            };
            setUserTeams(newUserTeams);
            setUserTeamsCookie(newUserTeams);
        }
        else {
            setTempUserTeams({...tempUserTeams, [updateKey]: newValue});

        }
    }

    if (tempUserTeams.favourite === false) {
        return (
            <TeamPicker pickerMessage = { 'Pick your favourite team '} teamList = { teams } updateKey = { 'favourite' } setTeam = { teamUpdater } />
        )
    }
    else if (tempUserTeams.rival1 === false) {
        return (
            <TeamPicker pickerMessage = { 'Pick your main rival '} teamList = { teams.filter(team => Object.keys(tempUserTeams).map(key => tempUserTeams[key]).indexOf(team) === -1) } updateKey = { 'rival1' } setTeam = { teamUpdater } />
        )
    }
    else if (tempUserTeams.rival2 === false) {
        return (
            <TeamPicker pickerMessage = { 'Pick your second rival '} teamList = { teams.filter(team => Object.keys(tempUserTeams).map(key => tempUserTeams[key]).indexOf(team) === -1) } updateKey = { 'rival2' } setTeam = { teamUpdater } />
        )
    }
}