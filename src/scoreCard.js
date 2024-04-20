import React, { useState, useEffect } from 'react';

export default function ScoreCard({ game }) {
    return (
        <div className = "score-card my-border">
            <div className = "team-container home-team" >
                <div className = "team-name">
                    { game.teams.home.name }
                </div>
                <div>
                    <img src={ game.teams.home.logo } className = "team-logo"></img>
                </div>
            </div>
            <div className = "score">
                <div className = "score-number home-score">
                    { game.goals.home }
                </div>
                <div className = "score-divider">
                    -
                </div>
                <div className = "score-number away-score">
                    { game.goals.away }
                </div>
            </div>
            <div className = "team-container away-team" >
                <div>
                    <img src={ game.teams.away.logo } className = "team-logo"></img>
                </div>
                <div className = "team-name">
                    { game.teams.away.name }
                </div>
            </div>
        </div>
    )
}