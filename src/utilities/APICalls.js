
export async function APISeason(leagueId) { 
    const response = await fetch('https://v3.football.api-sports.io/leagues/?' + new URLSearchParams({
        id: leagueId,
        current: true,
    }),
        {
            method: 'GET',
            headers: {
                'x-apisports-key': '41f2b6b0e6b7c3ab52a65fa8a28ca222'
            }
        });
    const result = await response.json();
    console.log(result);
    if (result.errors.length === 0) {
        return result.response[0].seasons[0].year; 
    }
    else {
        return Object.keys(result.errors)[0];
    }
}

export async function APIRound(leagueId, season) { 
    const response = await fetch('https://v3.football.api-sports.io/fixtures/rounds/?' + new URLSearchParams({
        league: leagueId,
        season: season,
        current: true,
    }),
        {
            method: 'GET',
            headers: {
                'x-apisports-key': '41f2b6b0e6b7c3ab52a65fa8a28ca222'
            }
        });
    const result = await response.json();
    console.log(result);
    if (result.errors.length === 0) {
        return {prefix: result.response[0].slice(0, 17), currentRound: Number(result.response[0].slice(16)), offset: 0};
    }
    else {
        return Object.keys(result.errors)[0];
    }
}

export async function APITeams(leagueId, season) {
    const response = await fetch('https://v3.football.api-sports.io/teams/?' + new URLSearchParams({
        league: leagueId,
        season: season,
    }),
        {
            method: 'GET',
            headers: {
                'x-apisports-key': '41f2b6b0e6b7c3ab52a65fa8a28ca222'
            }
        });
    const jsonString = await response.text();
    const result = JSON.parse(jsonString.replace("&apos;", "'"));
    console.log(result);
    if (result.errors.length === 0) {
        return result.response;
    }
    else {
        return Object.keys(result.errors)[0];
    }
}
  

export async function  APIFixtures(leagueId, season, round) {

    const response = await fetch('https://v3.football.api-sports.io/fixtures/?' + new URLSearchParams({
        league: leagueId,
        season: season,
        round: round,
    }),
        {
            method: 'GET',
            headers: {
                'x-apisports-key': '41f2b6b0e6b7c3ab52a65fa8a28ca222'
            }
        });
    const result = await response.json();
    console.log(result);
    if (result.errors.length === 0) {
        return result.response; 
    }
    else {
        return Object.keys(result.errors)[0];
    }
};

export async function APIStandings(leagueId, season) {
    const response = await fetch('https://v3.football.api-sports.io/standings/?' + new URLSearchParams({
        league: leagueId,
        season: season
    }),
    {
        method: 'GET',
        headers: {
            'x-apisports-key': '41f2b6b0e6b7c3ab52a65fa8a28ca222'
        }
    })
    const result = await response.json();
    console.log(result);
    if (result.errors.length === 0) {
        return result.response[0].league.standings[0];
    }
    else {
        return Object.keys(result.errors)[0];
    }
}

export async function getInitialData(leagueId) {
    const season = await APISeason(leagueId);
    if (season === 'rateLimit' || season === 'requests') {
        return season
    }
    const teams = await APITeams(leagueId, season);
    if (teams === 'rateLimit' || teams === 'requests') {
        return teams
    }
    const round = await APIRound(leagueId, season);
    if (round === 'rateLimit' || round === 'requests') {
        return round
    }
    const standings = await APIStandings(leagueId, season);
    if (standings === 'rateLimit' || standings === 'requests') {
        return standings
    }
    return {season: season, teams: teams, round: round, standings: standings};
}

