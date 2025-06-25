import { AdvPlayers, type FootballPlayer } from "../data/dataPlayer"
import { getPlayerDifficulty } from "./difficulty"


export interface GameRound {
    mysteryPlayer: FootballPlayer;
    teammates: FootballPlayer[];
    difficulty: 'easy' | 'medium' | 'hard';

}
export const generateRound = (userLevel: number, excludedPlayers: string[]): GameRound =>{
    const filteredPlayers = AdvPlayers.filter(data =>{
        const difficulty = getPlayerDifficulty(data.mysteryPlayer);

        const isExcluded = excludedPlayers.includes(data.mysteryPlayer.name);
        return(
        !isExcluded && (
        // (userLevel < 3 && difficulty === 'easy') ||
        // (userLevel >= 3 && userLevel < 6 && difficulty === 'medium') ||
        // (userLevel >= 6 && difficulty === 'hard')) 
        (userLevel >= 1 && userLevel < 2 && difficulty === 'easy') ||
        (userLevel >= 2 && userLevel < 3 && difficulty === 'medium') ||
        (userLevel >= 3 && difficulty === 'hard'))
        );
    });
 
    const roundData = filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];
    const reduceTeammates = userLevel > 3 
    ? roundData.teammates.slice(0,4)
    : roundData.teammates;

    return{
        ...roundData, 
        teammates: reduceTeammates,
        difficulty: getPlayerDifficulty(roundData.mysteryPlayer)
    };
}