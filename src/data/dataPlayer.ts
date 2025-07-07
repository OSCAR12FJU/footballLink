export interface FootballPlayer {
  id: number;
  name: string;
  imageUrl: string;
  teams: string[];
}

export interface GameData {
  mysteryPlayer: FootballPlayer;
  teammates: FootballPlayer[];
}

export class FootballService {
  private static instance: FootballService;
  private cacheKey = "footballPlayers";
  private playerNames = [
    "Lionel Messi",
    "Neymar",
    "Luis Suárez",
    "Sergio Agüero",
    "Ángel Di María",
    "Keylor Navas",
    "Paulo Dybala",
    "Gabriel Jesus",
    "Gonzalo Higuaín",
    "Marcelo",
    "Thiago Silva",
    "Leandro Paredes",
    "Carlos Tevez",
    "Javier Mascherano",
    "Marquinhos",
    "Lucas Moura",
    "Kylian Mbappé",
    "Diego Godín",
    "Cristian Rodríguez",
  ];

  private constructor() {}

  static getInstance(): FootballService {
    if (!FootballService.instance) {
      FootballService.instance = new FootballService();
    }
    return FootballService.instance;
  }

  async fetchFootballPlayer(playerName: string): Promise<FootballPlayer | null> {
    try {
      const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`);
      const data = await res.json();
      const player = data.player?.[0];
      if (!player) return null;

      return {
        id: Number(player.idPlayer),
        name: player.strPlayer,
        imageUrl: player.strCutout || player.strThumb || "",
        teams: [player.strTeam, player.strNationality].filter(Boolean),
      };
    } catch (error) {
      console.error("Error fetching player:", error);
      return null;
    }
  }

 async fetchAllPlayers(): Promise<FootballPlayer[]> {
  const playersPromises = this.playerNames.map(name => this.fetchFootballPlayer(name));
  const players = await Promise.all(playersPromises);
  // Filtrar nulls y retornar solo los válidos
  return players.filter((p): p is FootballPlayer => p !== null);
}

  async fetchAllPlayersCached(): Promise<FootballPlayer[]> {
    const cached = localStorage.getItem(this.cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    const players = await this.fetchAllPlayers();
    localStorage.setItem(this.cacheKey, JSON.stringify(players));
    return players;
  }

  // createGameData(players: FootballPlayer[]): GameData[] {
  //   const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  //   console.log("desde la función problema", players)
  //   const findByName = (name: string) => {
  //     const player = players.find(p => normalize(p.name) === normalize(name));
  //     // if (!player) throw new Error(`No se encontró el jugador: ${name}`);
  //     return player;
  //   };

  //   return [
  //     {
  //       mysteryPlayer: findByName("Lionel Messi"),
  //       teammates: [
  //         findByName("Leandro Paredes"),
  //         findByName("Paulo Dybala"),
  //         findByName("Luis Suárez"),
  //         findByName("Sergio Agüero"),
  //         findByName("Javier Mascherano"),
  //         findByName("Thiago Silva"),
  //       ],
  //     },
  //     {
  //       mysteryPlayer: findByName("Ángel Di María"),
  //       teammates: [
  //         findByName("Lionel Messi"),
  //         findByName("Leandro Paredes"),
  //         findByName("Gonzalo Higuaín"),
  //         findByName("Sergio Agüero"),
  //         findByName("Javier Mascherano"),
  //         findByName("Carlos Tevez"),
  //       ],
  //     },
  //     {
  //       mysteryPlayer: findByName("Thiago Silva"),
  //       teammates: [
  //         findByName("Neymar"),
  //         findByName("Marquinhos"),
  //         findByName("Lucas Moura"),
  //         findByName("Keylor Navas"),
  //         findByName("Kylian Mbappé"),
  //         findByName("Leandro Paredes"),
  //       ],
  //     },
  //     {
  //       mysteryPlayer: findByName("Luis Suárez"),
  //       teammates: [
  //         findByName("Lionel Messi"),
  //         findByName("Neymar"),
  //         findByName("Javier Mascherano"),
  //         findByName("Diego Godín"),
  //         findByName("Cristian Rodríguez"),
  //       ],
  //     },
  //     {
  //       mysteryPlayer: findByName("Gonzalo Higuaín"),
  //       teammates: [
  //         findByName("Lionel Messi"),
  //         findByName("Ángel Di María"),
  //         findByName("Paulo Dybala"),
  //         findByName("Carlos Tevez"),
  //         findByName("Sergio Agüero"),
  //       ],
  //     },
  //   ];
  // }
  createGameData(players: FootballPlayer[]): GameData[] {
  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const findByName = (name: string): FootballPlayer | undefined => {
    const player = players.find(p => normalize(p.name) === normalize(name));
    return player;
  };

  const rawRounds = [
    {
      mystery: "Lionel Messi",
      teammates: ["Leandro Paredes", "Paulo Dybala", "Luis Suárez", "Sergio Agüero", "Javier Mascherano", "Thiago Silva"],
    },
    {
      mystery: "Ángel Di María",
      teammates: ["Lionel Messi", "Leandro Paredes", "Gonzalo Higuaín", "Sergio Agüero", "Javier Mascherano", "Carlos Tevez"],
    },
    {
      mystery: "Thiago Silva",
      teammates: ["Neymar", "Marquinhos", "Lucas Moura", "Keylor Navas", "Kylian Mbappé", "Leandro Paredes"],
    },
    {
      mystery: "Luis Suárez",
      teammates: ["Lionel Messi", "Neymar", "Javier Mascherano", "Diego Godín", "Cristian Rodríguez"],
    },
    {
      mystery: "Gonzalo Higuaín",
      teammates: ["Lionel Messi", "Ángel Di María", "Paulo Dybala", "Carlos Tevez", "Sergio Agüero"],
    },
  ];

  const rounds: GameData[] = [];

  for (const r of rawRounds) {
    const mysteryPlayer = findByName(r.mystery);
    if (!mysteryPlayer) {
      // Si no se encuentra el mystery, saltear esta ronda
      continue;
    }

    const teammates = r.teammates
      .map(name => findByName(name))
      .filter((p): p is FootballPlayer => !!p); // quita undefined

    rounds.push({
      mysteryPlayer,
      teammates,
    });
  }

  return rounds;
}


}
