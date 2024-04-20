import React, { useState, useEffect } from 'react';
import ScoreCard from './scoreCard'

export default function ScoreList() {

    const [games, setGames] = useState([])

    const useEffectTest = (() => {
        fetch("/testData.txt")
        .then((res) => res.text())
        .then((text) => {
            setGames(JSON.parse(text));
        })          
    }, []);

    const useEffectAPI = (() => {
        fetch('https://v3.football.api-sports.io/fixtures/?' + new URLSearchParams({
            league: 39,
            season: 2023,
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
                console.log(JSON.stringify(result.response))
                setGames(result.response)
            }) 
    }, []);
    
    useEffect(() => {
        fetch("/testFixtures.txt")
        .then((res) => res.text())
        .then((text) => {
            setGames(JSON.parse(text));
        })          
    }, []);

    return (
        <div className="score-list">
            { games.map(game => 
                <ScoreCard key = { game.fixture.id } game = { game } userTeams = { userTeams }/>
            )}
        </div>
    )
}