import React, { useState, useEffect } from 'react';
import platitudeGenerator from '../utilities/platitudeGenerator'

export default function ScoreCard({ fixture, userTeams }) {

    var displayClass = '';
    var margin = 0;
    const fixtureDate = new Date(fixture.fixture.date);
    const dateDisplay = fixtureDate.getDate() + '/' + fixtureDate.getMonth() + '/' + fixtureDate.getFullYear().toString().slice(-2) + ' ' + fixtureDate.getHours() + ':' + fixtureDate.getMinutes() + ((fixtureDate.getMinutes() < 10) ? '0' : '')
    var teamPlaying = '';

    function allegiance() {

        if (fixture.teams.home.id === userTeams.favourite.team.id) {
            teamPlaying = userTeams.favourite;
            return 'home';
        }
        else if (fixture.teams.away.id === userTeams.favourite.team.id) {
            teamPlaying = userTeams.favourite;
            return 'away';
        }
        else {
            for (let i in userTeams.rivals ) {
                if (fixture.teams.home.id === userTeams.rivals[i].team.id) {
                    teamPlaying = userTeams.rivals[i];
                    return 'away';
                }
                else if (fixture.teams.away.id === userTeams.rivals[i].team.id) {
                    teamPlaying = userTeams.rivals[i];
                    return 'home';
                }
            }
            return 'neutral'
        }
    }

    var rootingFor = allegiance();
    

    if (rootingFor === 'home') {
        if (fixture.goals.home > fixture.goals.away) {
            // displayClass = 'celebrate';
            // margin = fixture.goals.home - fixture.goals.away;
        }
        else if (fixture.goals.away > fixture.goals.home) {
            displayClass = 'hideMe';
            margin = fixture.goals.away - fixture.goals.home;
        }
    }
    else if (rootingFor === 'away') {
        if (fixture.goals.away > fixture.goals.home) {
            // displayClass = 'celebrate';
            // margin = fixture.goals.away - fixture.goals.home;
        }
        else if (fixture.goals.home > fixture.goals.away) {
            displayClass = 'hideMe';
            margin = fixture.goals.home - fixture.goals.away;
        }
    }

    return (
        <div className = {"score-card my-border " + displayClass}>
            { displayClass === "hideMe" && 
                <div className = "bad-result-overlay">
                    { platitudeGenerator(teamPlaying) }
                </div>
            }
            <div className = "score-header">
                { dateDisplay }
            </div>
            <div className = "score-body">
                <div className = "team-container home-team" >
                    <div className = "team-name">
                        { fixture.teams.home.name }
                    </div>
                    <div>
                        <img src={ fixture.teams.home.logo } className = "team-logo"></img>
                    </div>
                </div>
                <div className = "score">
                    <div className = "score-number home-score">
                        { fixture.goals.home }
                    </div>
                    <div className = "score-divider">
                        -
                    </div>
                    <div className = "score-number away-score">
                        { fixture.goals.away }
                    </div>
                </div>
                <div className = "team-container away-team" >
                    <div>
                        <img src={ fixture.teams.away.logo } className = "team-logo"></img>
                    </div>
                    <div className = "team-name">
                        { fixture.teams.away.name }
                    </div>
                </div>
            </div>
        </div>
    )
}