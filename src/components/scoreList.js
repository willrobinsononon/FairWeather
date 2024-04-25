import React, { useState, useEffect } from 'react';
import ScoreCard from './scoreCard'
import { getFixtures } from '../utilities/savedAPICalls'

export default function ScoreList( { fixtures, setFixtures, season, leagueId, userTeams, round }) {
    
    useEffect(() => {
        getFixtures(leagueId, season, round).then(fixtures => setFixtures(fixtures));
    }, []);

    return (
        <div className="score-list">
            { fixtures.map(fixture => 
                <ScoreCard key = { fixture.fixture.id } fixture = { fixture } userTeams = { userTeams }/>
            )}
        </div>
    )
}