import React, { useState, useEffect } from 'react';


export default function NavBar( {setUserTeams, seasonData, setSeasonData }) {

    function reSubmitTeams() {
        setSeasonData({...seasonData, round: {...seasonData.round, offset: 0}});
        setUserTeams('init');
    }

    function previousRound() {
        if (seasonData.round.currentRound + seasonData.round.offset - 1 < 1) {
            return
        }
        else {
            setSeasonData({...seasonData, round: {...seasonData.round, offset: seasonData.round.offset - 1}});
            window.history.pushState({...seasonData, round: {...seasonData.round, offset: seasonData.round.offset - 1}}, '', `/round/${seasonData.round.currentRound + seasonData.round.offset - 1}`);
        }        
    }
    
    function nextRound() {
        if (seasonData.round.currentRound + seasonData.round.offset + 1 > (seasonData.teams.length - 1) * 2) {
            return
        }
        else {
            setSeasonData({...seasonData, round: {...seasonData.round, offset: seasonData.round.offset + 1}});
            window.history.pushState({...seasonData, round: {...seasonData.round, offset: seasonData.round.offset + 1}}, '', `/round/${seasonData.round.currentRound + seasonData.round.offset + 1}`);
        }        
    }

    return (
        <div className="nav-bar my-border">
            <div className="nav-spacer nav-round">
                {seasonData.round.currentRound + seasonData.round.offset > 1 && 
                    <div className="nav-button" onClick={ previousRound }>Previous Round</div>
                }
            </div>
            <div className="nav-spacer nav-resubmit">
                <div className="nav-button" onClick={ reSubmitTeams }>Resubmit Teams</div>
                </div>
            <div className="nav-spacer nav-round">
                {seasonData.round.currentRound + seasonData.round.offset < (seasonData.teams.length - 1) * 2 && 
                    <div className="nav-button" onClick={ nextRound }>Next Round</div>
                }
            </div>
        </div>
    )
}