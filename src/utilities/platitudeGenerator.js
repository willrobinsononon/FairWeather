export default function platitudeGenerator(team) {
    const platitudes = [
        `I guess ${ team.team.name } took a week off`,
        `${ team.team.name }? errm playing mid week I think`,
        `${ team.team.name }.. dunno.. do you like the smell of wet stone?`,
        `Haven't you heard? ${ team.team.name } all got dicky tummies and are in bed`,
        `${ team.team.name}.. sounds Dutch are they Dutch?`,
        `I heard ${ team.team.name } aren't playing today, early Christmas present from the gaffer.`,
        `The referee must have forgotten to write down the ${ team.team.name } score`,
        `Deano's uncle works at the dry cleaners says they shrunk all ${ team.team.name }'s kits and they couldn't play`,
        `My uncle knows the groundskeeper, a big hole opened up in the ${ team.venue.name } pitch`,
        `My mate said ${ team.team.name }'s whole team got jury service!`,
        `Apparently ${ team.team.name } all went on a French vineyard tour and refused to come home`,
        `Apparently ${ team.team.name} stayed out too late at a Kasabian gig and didn't turn up today`,
        `${ team.team.name }'s whole team are hooked on Marie Kondo and won't leave the house I heard`,
        `My dad says all the balls blew away at the ${ team.team.name } game`,
        `${ team.team.name }.. dunno.. do you like the smell of hot plastic?`,
        `${ team.team.name }.. dunno.. do you like the taste of copper?`,
        `${ team.team.name }.. not sure.. have you ever seen an eagle in real life?`,
        `${ team.team.name }.. dunno.. what colour is the bottle bin where you live?`,
        `I saw online, ${ team.team.name } got caught out by the train strike`,
    ]

    const index = Math.floor(Math.random() * 19);

    return platitudes[index];
}