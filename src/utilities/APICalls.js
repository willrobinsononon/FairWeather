
export async function getSeason(leagueId) { 
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
    const result_1 = await response.json();
    return result_1.response[0].seasons[0].year; 
}

export async function getRound(leagueId, season) { 
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
    return result.response[0]; 
}

export async function getTeams(leagueId, season) {
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
    const result = await response.json();
    return result.response; 
}
  

export async function  getFixtures(leagueId, season, round) {
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
    return result.response; 
};

export async function getStandings(leagueId, season) {
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
    return result.response[0].league.standings[0];
}