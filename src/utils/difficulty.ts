import type { FootballPlayer } from "../data/dataPlayer";

export type Difficulty = 'easy' | 'medium' | 'hard';

export const getPlayerDifficulty = (player: FootballPlayer): Difficulty =>{
    const popularPlayer = ["Lionel Messi",
  "Neymar",];

    return popularPlayer.includes(player?.name) ? 'easy' :
            player.teams.length > 2 ? 'medium' : 'hard';

}