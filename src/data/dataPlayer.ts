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

export const footballPlayers: FootballPlayer[] = [
  { id: 1, name: "Lionel Messi", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/h2c6rj1725183431.png", teams: ["Barcelona", "PSG", "Argentina"] },
  { id: 2, name: "Neymar ", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/fe708x1678357303.png", teams: ["Barcelona", "PSG", "Brazil"] },
  { id: 3, name: "Luis Suárez", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/okvnow1725182592.png", teams: ["Barcelona", "Uruguay"] },
  { id: 4, name: "Sergio Agüero", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/154cn11557827597.png", teams: ["Manchester City", "Argentina"] },
  { id: 5, name: "Ángel Di María", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/o3wzks1679483894.png", teams: ["PSG", "Real Madrid", "Argentina"] },
  { id: 6, name: "Keylor Navas", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/vo1yli1704463423.png", teams: ["PSG", "Costa Rica"] },
  { id: 7, name: "Paulo Dybala", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/c2gi8r1718476751.png", teams: ["Juventus", "Argentina"] },
  { id: 8, name: "Gabriel Jesus", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/8g7zsb1694203963.png", teams: ["Manchester City", "Brazil"] },
  { id: 9, name: "Gonzalo Higuaín", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/lsm2601647080134.png", teams: ["Juventus", "Real Madrid", "Argentina"] },
  { id: 10, name: "Marcelo", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/4mlqdq1699193933.png", teams: ["Real Madrid", "Brazil"] },
  { id: 11, name: "Thiago Silva", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/c1j7gx1694034214.png", teams: ["PSG", "Brazil"] },
  { id: 12, name: "Leandro Paredes", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/bcvadw1679483848.png", teams: ["PSG", "Argentina"] },
  { id: 13, name: "Carlos Tevez", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/na8lpp1654245743.png", teams: ["Manchester City", "Argentina"] },
  { id: 14, name: "Javier Mascherano", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/q4bxnr1605512194.png", teams: ["Barcelona", "Argentina"] },
  { id: 15, name: "Maxi Rodríguez", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/kjkmx51514068213.png", teams: ["Argentina", "Liverpool"] },
  { id: 16, name: "Lucas Biglia", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/rn2xuj1520156615.png", teams: ["Argentina", "Lazio"] },
  { id: 17, name: "Lucas Moura", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/1jki0i1558102181.png", teams: ["PSG", "Brazil"] },
  { id: 18, name: "Marquinhos", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/fe3mcs1715359089.png", teams: ["PSG", "Brazil"] },
  { id: 19, name: "Marco Verratti", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/wgbjb91704625717.png", teams: ["PSG", "Italy"] },
  { id: 20, name: "Kylian Mbappé", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/h9u9vz1733653583.png", teams: ["PSG", "France"] },
  { id: 21, name: "Ezequiel Lavezzi", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/dstwj71719263284.png", teams: ["Argentina", "Napoli", "PSG"] },
  { id: 22, name: "Diego Godín", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/t7lux81632342837.png", teams: ["Uruguay", "Atlético Madrid"] },
  { id: 23, name: "Cristian Rodríguez", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/kdr01i1514058631.png", teams: ["Uruguay", "Atlético Madrid"] },
  { id: 24, name: "Sebastián Coates", imageUrl: "https://www.thesportsdb.com/images/media/player/cutout/acm4dv1632923195.png", teams: ["Uruguay", "Sporting CP"] },
];
// Adivinanzas (mínimo 6 compañeros válidos)
export const AdvPlayers: GameData[] = [
  {
    mysteryPlayer: footballPlayers[0], // Lionel Messi
    teammates: [
      // footballPlayers[1],  // Neymar - Barcelona/PSG
      footballPlayers[6],  // Navas - PSG
      footballPlayers[4],  // Di María - Argentina/PSG
      footballPlayers[3],  // Agüero - Argentina
      footballPlayers[13], // Mascherano - Barcelona/Argentina
      footballPlayers[19], // Mbappé - PSG
    ]
  },
  {
    mysteryPlayer: footballPlayers[4], // Ángel Di María
    teammates: [
      // footballPlayers[0],  // Messi - Argentina/PSG
      footballPlayers[18],  // Neymar - PSG
      footballPlayers[9],  // Marcelo - Real Madrid
      footballPlayers[10], // Thiago Silva - PSG
      footballPlayers[8],  // Higuaín - Argentina/Real Madrid
      footballPlayers[11], // Paredes - PSG/Argentina
    ]
  },
  // {
  //   mysteryPlayer: footballPlayers[6], // Paulo Dybala
  //   teammates: [
  //     footballPlayers[8],  // Higuaín - Juventus
  //     // footballPlayers[0],  // Messi - Argentina
  //     footballPlayers[4],  // Di María - Argentina
  //     footballPlayers[13],  // Mascherano - Argentina
  //     footballPlayers[3],  // Agüero - Argentina
  //     footballPlayers[15], // Biblia - Argentina
  //   ]
  // },
  {
    mysteryPlayer: footballPlayers[10], // Thiago Silva
    teammates: [
      // footballPlayers[1],  // Neymar - Brasil/PSG
      footballPlayers[11], // Paredes - PSG
      footballPlayers[0],  // Messi - PSG
      footballPlayers[4],  // Di María - PSG
      footballPlayers[16], // Lucas Moura - PSG
      footballPlayers[17], // Marquinhos - PSG
    ]
  },
  {
    mysteryPlayer: footballPlayers[2], // Luis Suarez
    teammates: [
      footballPlayers[0],  // Messi - PSG
      footballPlayers[1],  // Neymar - PSG
      // footballPlayers[4],  // Di María - PSG
      footballPlayers[13], // Mascherano - Barca
      footballPlayers[21], // Godín - Uruguay
      footballPlayers[22], // Cristian Rodríguez - Uruguay
    ]
  },
  {
    mysteryPlayer: footballPlayers[8], // Gonzalo Higuaín
    teammates: [
      footballPlayers[4],  // Di María - Argentina/Real Madrid
      // footballPlayers[0],  // Messi - Argentina
      footballPlayers[6],  // Dybala - Juventus
      footballPlayers[9], // Marcelo - Real Madrid
      footballPlayers[12], // Tevez - Argentina
      footballPlayers[13], // Mascherano - Argentina
    ]
  },
];
