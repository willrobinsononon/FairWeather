import React, { useState, useEffect } from 'react';

export default function ScoreCard({ game, userTeams }) {

    var testText = '';
    var displayClass = ''
    var margin = 0

    function allegiance() {
        if (game.teams.home.id === userTeams.favourite.id) {
            return 'home'
        }
        else if (game.teams.away.id === userTeams.favourite.id) {
            return 'away'
        }
        else if (game.teams.home.id === userTeams.rival1.id) {
            return 'away'
        }
        else if (game.teams.away.id === userTeams.rival1.id) {
            return 'home'
        }
        else if (game.teams.home.id === userTeams.rival2.id) {
            return 'away'
        }
        else if (game.teams.away.id === userTeams.rival2.id) {
            return 'home'
        }
        else {
            return 'neutral'
        }
    }

    var rootingFor = allegiance();
    

    if (rootingFor === 'home') {
        if (game.goals.home > game.goals.away) {
            displayClass = 'celebrate';
            margin = game.goals.home - game.goals.away;
        }
        else if (game.goals.away > game.goals.home) {
            displayClass = 'hideMe';
            margin = game.goals.away - game.goals.home;
        }
    }
    else if (rootingFor === 'away') {
        if (game.goals.away > game.goals.home) {
            displayClass = 'celebrate';
            margin = game.goals.away - game.goals.home;
        }
        else if (game.goals.home > game.goals.away) {
            displayClass = 'hideMe';
            margin = game.goals.home - game.goals.away;
        }
    }

    return (
        <div className = {"score-card my-border " + displayClass}>
            { testText }
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