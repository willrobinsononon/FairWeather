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

export async function savedSeason() {
    return 2023;
};

export async function savedRound() {
    const round = 'Regular Season - 34'
    return {prefix: round.slice(0, 17), currentRound: Number(round.slice(16)), offset: 0};
};

export async function savedTeams() {
    const result = await fetch("/savedTeams.txt");
    const response = await result.text();
    return JSON.parse(response); 
};

export async function savedFixtures(round) {
    const result = await fetch("/savedFixtures.txt");
    const response = await result.text();
    var fixtures = JSON.parse(response);
    testFixture.goals.home = round.slice(-2);
    testFixture.goals.away = round.slice(-2);
    return [testFixture, ...fixtures];
}

export async function savedStandings() {
    const result = await fetch("/savedStandings.txt");
    const response = await result.text();
    return JSON.parse(response).response[0].league.standings[0];
}

export async function getSavedInitialData() {
    const season = await savedSeason();
    const teams = await savedTeams();
    const round = await savedRound();
    const standings = await savedStandings();
    return {season: season, teams: teams, round: round, standings: standings};
}