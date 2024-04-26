import React, { useState, useEffect } from 'react';
import { getRound } from '../utilities/savedAPICalls'


export default function NavBar( {teams, userTeams, setUserTeams, round, setRound, leagueId, season }) {

    function reSubmitTeams() {
        getRound(leagueId, season).then(round => setRound(round));
        setUserTeams('init');
    }

    function previousRound() {
        const newRoundNo = Number(round.slice(16)) - 1;
        if (newRoundNo < 1) {
            return
        }
        else {
            const newRound = round.slice(0, 17) + newRoundNo;
            setRound(newRound);            
        }        
    }
    
    function nextRound() {
        const newRoundNo = Number(round.slice(16)) + 1;
        if (newRoundNo > (teams.length - 1) * 2) {
            return
        }
        else {
            const newRound = round.slice(0, 17) + newRoundNo;
            setRound(newRound);
        }        
    }

    return (
        <div className="nav-bar">
            <div className="nav-button-container">
                {Number(round.slice(16)) > 1 && 
                    <button type="button" className="nav-button round-nav" onClick={ previousRound }>Previous Round</button>
                }
            </div>
            <div className="nav-button-container">
                <button type="button" className="nav-button resubmit-teams" onClick={ reSubmitTeams }>Resubmit Teams</button>
            </div>
            <div className="nav-button-container">
                {Number(round.slice(16)) < (teams.length + Object.keys(userTeams).length - 1) * 2 && 
                    <button type="button" className="nav-button round-nav" onClick={ nextRound }>Next Round</button>
                }
            </div>
        </div>
    )
}