
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



export async function fetchFootballPlayer(playerName: string): Promise<FootballPlayer | null> {
  try {
    const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`);
    const data = await res.json();

    const player = data.player?.[0];
    if (!player) return null;

    return {
      id: Number(player.idPlayer),
      name: player.strPlayer,
      imageUrl: player.strCutout || player.strThumb || "", 
      teams: [player.strTeam, player.strNationality].filter(Boolean)
    };
  } catch (error) {
    console.error("Error fetching player:", error);
    return null;
  }
}

///////////////LLLAMAR JUGADORES/////////////////////////////////
export const playerNames = [
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
  "Cristian Rodríguez"
  // y todos los demás que uses en createAdvPlayers
];



export async function fetchAllPlayers(): Promise<FootballPlayer[]> {
  const promises = playerNames.map(name => fetchFootballPlayer(name));
  const results = await Promise.all(promises);

  const failed = playerNames.filter((_, idx) => results[idx] === null);
  console.log("⚠️ Jugadores no encontrados:", failed);

  // Filtramos los que no existan
  return results.filter((p): p is FootballPlayer => p !== null);
}

  //Este me va devolver la esturctura jugadores a encontrar con la data de cada jugador.
  export function createAdvPlayers(players: FootballPlayer[]): GameData[] {
    // Helper para buscar por nombre
  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const findByName = (name: string) => {
    const player = players.find(p => normalize(p.name) === normalize(name));
    if (!player) {
      throw new Error(`No se encontró el jugador: ${name}`);
    }
    return player;
  };
  return [
    {
      mysteryPlayer: findByName("Lionel Messi"),
      teammates: [
        findByName("Leandro Paredes"),
        findByName("Paulo Dybala"),
        findByName("Luis Suárez"),
        findByName("Sergio Agüero"),
        findByName("Javier Mascherano"),
        findByName("Thiago Silva"),
      ],
    },
    {
      mysteryPlayer: findByName("Ángel Di María"),
      teammates: [
        findByName("Lionel Messi"),
        findByName("Leandro Paredes"),
        findByName("Gonzalo Higuaín"),
        findByName("Sergio Agüero"),
        findByName("Javier Mascherano"),
        findByName("Carlos Tevez"),
      ],
    },
    {
      mysteryPlayer: findByName("Thiago Silva"),
      teammates: [
        findByName("Neymar"),
        findByName("Marquinhos"),
        findByName("Lucas Moura"),
        findByName("Keylor Navas"),
        findByName("Kylian Mbappé"),
        findByName("Leandro Paredes"),
      ],
    },
    {
      mysteryPlayer: findByName("Luis Suárez"),
      teammates: [
        findByName("Lionel Messi"),
        findByName("Neymar"),
        findByName("Javier Mascherano"),
        findByName("Diego Godín"),
        findByName("Cristian Rodríguez"),
      ],
    },
    {
      mysteryPlayer: findByName("Gonzalo Higuaín"),
      teammates: [
        findByName("Lionel Messi"),
        findByName("Ángel Di María"),
        findByName("Paulo Dybala"),
        findByName("Carlos Tevez"),
        findByName("Sergio Agüero"),
      ],
    },
  ];
}


console.log("todos los jugadores",fetchAllPlayers())