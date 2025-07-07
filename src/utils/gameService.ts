import {type FootballPlayer, type GameData } from "../data/dataPlayer"

export interface GameRound {
    mysteryPlayer: FootballPlayer;
    teammates: FootballPlayer[];
    // difficulty: 'easy' | 'medium' | 'hard';
}
export const generateRound = (
    // userLevel: number, 
    excludedPlayers: string[],
    games: GameData[]
    ): GameRound =>{
    const filteredPlayers = games.filter(data =>{

        if(!data.mysteryPlayer){
            console.warn("Elemento sin mysteryPlayer:", data);
            return false
        }
        // const difficulty = getPlayerDifficulty(data.mysteryPlayer);
        const isExcluded = excludedPlayers.includes(data.mysteryPlayer.name);
        return !isExcluded;
        // return(
        // !isExcluded && (
        // (userLevel >= 1 && userLevel < 2 && difficulty === 'easy') ||
        // (userLevel >= 2 && userLevel < 3 && difficulty === 'medium') ||
        // (userLevel >= 3 && difficulty === 'hard'))
        // );
    });

    if(filteredPlayers.length === 0){
      throw new Error("No hay jugadores disponibles para este nivel y exclusiones");
    }

    const roundData = filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];
    // const reduceTeammates = userLevel > 3 
    // ? roundData.teammates.slice(0,4)
    // : roundData.teammates;

    return{
        ...roundData, 
        teammates: roundData.teammates,
        // difficulty: getPlayerDifficulty(roundData.mysteryPlayer)
    };
}