export function setUserTeamsCookie(userTeams) {

    document.cookie = ('userTeams=' + encodeURIComponent(JSON.stringify(userTeams)).replace(/'/g, "%27"));
}

export function setUserTeamsCookieMonth(userTeams) {
    const value = JSON.stringify(userTeams);
    const expireEnd = new Date();
    
    expireEnd.setTime(expireEnd.getTime() + (30*24*60*60*1000));
    document.cookie = ('userTeams=' + value + ';expires=' + expireEnd.toUTCString() + ';path=/');
}

export function getUserTeamsCookie() {
    let decodedCookie = decodeURIComponent(document.cookie);
    const clist = decodedCookie.split(';');
    for (let i in clist) {
        let citem = clist[i];
        while (citem.charAt(0) == ' ') {
            citem = citem.substring(1);
        }
        if (citem.indexOf('userTeams') === 0) {
            return JSON.parse(citem.substring(10));
        }
    }
    return false;
}