export default function excuseGenerator(team, index) {
    const excuses = [
        `I guess ${ team.team.name } took a week off`,
        `${ team.team.name }? errm playing mid week I think`,
        `${ team.team.name }.. dunno.. do you like the smell of wet stone?`,
        `Haven't you heard? ${ team.team.name } all got dicky tummies and are in bed`,
        `${ team.team.name}.. sounds Dutch are they Dutch?`,
        `I heard ${ team.team.name } aren't playing today, early Christmas present from the gaffer.`,
        `Maybe the ref forgot to write down the ${ team.team.name } score`,
        `I'm sure someone said ${ team.team.name }'s kits all got shrunk at the cleaners and they couldn't play`,
        `A big hole has opened up in the ${ team.venue.name } pitch, think that's what the news said`,
        `My mate said ${ team.team.name }'s whole team got jury service!`,
        `Think I heard ${ team.team.name } all went on a French vineyard tour and refused to come home`,
        `Apparently ${ team.team.name} stayed out too late at a Kasabian gig and didn't turn up today`,
        `${ team.team.name }'s whole team are hooked on Marie Kondo and won't leave the house I heard`,
        `My dad says all the balls blew away at the ${ team.team.name } game`,
        `${ team.team.name }.. dunno.. do you like the smell of hot plastic?`,
        `${ team.team.name }.. dunno.. do you like the taste of copper?`,
        `${ team.team.name }.. not sure.. have you ever seen a bald eagle?`,
        `${ team.team.name }.. dunno.. what colour is the bottle bin where you live?`,
        `Sure I saw online, ${ team.team.name } got caught out by the train strike`,
    ]

    return excuses[index];
}