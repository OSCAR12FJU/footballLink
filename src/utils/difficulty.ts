import type { FootballPlayer } from "../data/dataPlayer";

export type Difficulty = 'easy' | 'medium' | 'hard';

export const getPlayerDifficulty = (player: FootballPlayer): Difficulty =>{
    const popularPlayer = [1,2,3,20];

    return popularPlayer.includes(player.id) ? 'easy' :
            player.teams.length > 2 ? 'medium' : 'hard';

}