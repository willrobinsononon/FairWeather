var testFixture = {
    fixture:{
        "id":2,
        "referee":"S. Barrott",
        "timezone":"UTC",
        "date":"2024-03-30T15:00:00+00:00",
        "timestamp":1711810800,
        "periods":{
            "first":1711810800,
            "second":1711814400},
        "venue":{
            "id":504,
            "name":"Vitality Stadium",
            "city":"Bournemouth, Dorset"},
        "status":{
            "long":"Match Finished",
            "short":"FT",
            "elapsed":90}},
    league:{
        "id":39,
        "name":"Premier League",
        "country":"England",
        "logo":"https://media.api-sports.io/football/leagues/39.png",
        "flag":"https://media.api-sports.io/flags/gb.svg",
        "season":2023,
        "round":
        "Regular Season - 30"},
    teams:{
        "home":{
            "id":35,
            "name":"Round",
            "logo":"https://png.pngtree.com/png-clipart/20220620/original/pngtree-emoji-3d-rendering-smiley-face-png-image_8130171.png",
            "winner":true},
        "away":{
            "id":45,
            "name":"Number",
            "logo":"https://png.pngtree.com/png-clipart/20220620/original/pngtree-emoji-3d-rendering-smiley-face-png-image_8130171.png",
            "winner":false}},
    goals:{
        home:2,
        away:1},
    score:{
        "halftime":{
            "home":0,
            "away":0},
        "fulltime":{
            "home":2,
            "away":1},
        "extratime":{
            "home":null,
            "away":null},
        "penalty":{
            "home":null,
            "away":null}}}

export async function getSeason(leagueId) {
    return 2023;
};

export async function getRound(leagueId, season) {
    return 'Regular Season - 34';
};

export async function getTeams(leagueId, season) {
    const result = await fetch("/savedTeams.txt");
    const response = await result.text();
    return JSON.parse(response); 
};

export async function getFixtures(leagueId, season, round) {
    const result = await fetch("/savedFixtures.txt");
    const response = await result.text();
    var fixtures = JSON.parse(response);
    testFixture.goals.home = round.slice(-2);
    testFixture.goals.away = round.slice(-2);
    return [testFixture, ...fixtures];
}

export async function getStandings(leagueId, season) {
    const result = await fetch("/savedStandings.txt");
    const response = await result.text();
    return JSON.parse(response).response[0].league.standings[0];
}