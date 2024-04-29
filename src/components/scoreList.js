import React, { useState, useEffect } from 'react';
import ScoreCard from './scoreCard'
import { getFixtures } from '../utilities/savedAPICalls'

export default function ScoreList( { season, leagueId, userTeams, round }) {

    const [fixtures, setFixtures] = useState([]);

    var randomSeeds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = randomSeeds.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = randomSeeds[i];
        randomSeeds[i] = randomSeeds[j];
        randomSeeds[j] = temp;
    }

    useEffect(() => {
        getFixtures(leagueId, season, round).then(fixtures => setFixtures(fixtures));
    }, [round]);

    return (
        <div className="score-list">
            { fixtures.map(( fixture, index ) => 
                <ScoreCard key = { fixture.fixture.id } fixture = { fixture } userTeams = { userTeams } excuseSeed = { randomSeeds[index] } />
            )}
        </div>
    )
}