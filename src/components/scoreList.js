import React, { useState, useEffect } from 'react';
import ScoreCard from './scoreCard'
import { APIFixtures } from '../utilities/APICalls'
import { savedFixtures } from '../utilities/savedAPICalls'
import { setUseSavedDataCookie } from '../utilities/cookieFunctions';

export default function ScoreList( { seasonData, userTeams, useSavedData, setUseSavedData }) {

    const [fixtures, setFixtures] = useState([]);

    var randomSeeds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = randomSeeds.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = randomSeeds[i];
        randomSeeds[i] = randomSeeds[j];
        randomSeeds[j] = temp;
    }

    useEffect(() => {

        //window.location.pathname = '/round/5';
        //window.history.pushState(seasonData, '', `/round/${seasonData.round.currentRound + seasonData.round.offset}`);

        if (useSavedData) {
            savedFixtures(seasonData.round.prefix + String(seasonData.round.currentRound + seasonData.round.offset))
            .then(fixtures => setFixtures(fixtures));
        }
        else {
            APIFixtures(seasonData.leagueId, seasonData.season, seasonData.round.prefix + String(seasonData.round.currentRound + seasonData.round.offset))
            .then(fixtures => {
                if (fixtures === "rateLimit") {
                    alert("We've hit the rate limit for the API, please wait a minute and try again.");
                }
                else if (fixtures === "requests") {
                    alert("We've reached the daily request limit for the API, switching to saved test data.");
                    setUseSavedData(true);
                    setUseSavedDataCookie(true);
                    savedFixtures(seasonData.round.prefix + String(seasonData.round.currentRound + seasonData.round.offset))
                    .then(fixtures => setFixtures(fixtures));
                }
                else {
                    setFixtures(fixtures);
                }
            });
        }
    }, [seasonData]);

    return (
        <div className="score-list">
            { fixtures.map(( fixture, index ) => 
                <ScoreCard roundOffset = { seasonData.round.offset } key = { fixture.fixture.id } fixture = { fixture } userTeams = { userTeams } excuseSeed = { randomSeeds[index] } />
            )}
        </div>
    )
}