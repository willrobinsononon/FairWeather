import React, { useState, useEffect } from 'react';
import ScoreCard from './scoreCard'

export default function ScoreList( { season, leagueId, userTeams }) {

    const [games, setGames] = useState([]);

    function fixturesSavedData() {
        fetch("/testFixtures.txt")
        .then((res) => res.text())
        .then((text) => {
            setGames(JSON.parse(text));
        })          
    };

    function  fixturesAPICall() {
        fetch('https://v3.football.api-sports.io/fixtures/?' + new URLSearchParams({
            league: leagueId,
            season: season,
            round: 'Regular Season - 30',
        }),
        {
            method: 'GET',
            headers: {
                'x-apisports-key': '41f2b6b0e6b7c3ab52a65fa8a28ca222'
            }
        })
            .then(response => response.json())
            .then(result => {
                setGames(result.response)
            }) 
    };
    
    useEffect(() => {
        fixturesSavedData() 
    }, []);

    return (
        <div className="score-list">
            { games.map(game => 
                <ScoreCard key = { game.fixture.id } game = { game } userTeams = { userTeams }/>
            )}
        </div>
    )
}